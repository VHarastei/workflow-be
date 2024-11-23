import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { AskQuestionDto } from './dto/askQuestion.dto';
import { SomethingWentWrongException } from 'src/common/exceptions/SomethingWentWrongException';
import Handlebars from 'handlebars';
import { ASK_QUESTION_PROMPT } from './constants/askQuestionPrompt';
import { ASK_FILE_PROMPT } from './constants/analyzeFilePrompt';
import { AnalyzeFileDto } from './dto/analyzeFile.dto';
import { FileService } from '../file/file.service';
import { FileDoesNotExistException } from 'src/common/exceptions/FileDoesNotExistException';
import { DigitalOceanService } from '../digitalocean/digitalocean.service';
import * as pdf from 'pdf-parse';
import { config } from 'dotenv';

config();

const { LLM_NAME } = process.env;

@Injectable()
export class LLMService {
  constructor(
    private messageService: MessageService,
    private fileService: FileService,
    private digitalOceanService: DigitalOceanService,
  ) {}
  async askQuestion(askQuestionDto: AskQuestionDto) {
    const roomHistory = await this.getRoomHistory(askQuestionDto.roomId);

    const template = Handlebars.compile(ASK_QUESTION_PROMPT);
    const promptData = { roomHistory, userMessage: askQuestionDto.text };
    const prompt = template(promptData);

    const data = await this.llmRequest(prompt);

    return {
      id: data.id,
      text: data.choices[0].message.content,
      isAssistant: true,
    };
  }

  async analyzeFile(analyzeFileDto: AnalyzeFileDto) {
    const file = await this.fileService.findOne(analyzeFileDto.fileId);
    if (!file) throw new FileDoesNotExistException();

    const fileBuffer = await this.digitalOceanService.getObject(file.path);
    if (!fileBuffer) throw new FileDoesNotExistException();
    const buffer = fileBuffer.Body as Buffer;

    const parsedFile = await pdf(buffer);
    if (!parsedFile) throw new SomethingWentWrongException();

    const template = Handlebars.compile(ASK_FILE_PROMPT);
    const promptData = { userMessage: analyzeFileDto.text, fileContent: parsedFile.text };
    const prompt = template(promptData);

    const data = await this.llmRequest(prompt);

    return {
      id: data.id,
      text: data.choices[0].message.content,
      isAssistant: true,
    };
  }

  private async getRoomHistory(roomId: string) {
    const messages = await this.messageService.findAllSimple(roomId);

    return messages.map((message) => {
      const parsedText = JSON.parse(message.text);
      const content = parsedText.ops.map((item) => item.insert).join('');

      return `[${message.user.firstName} ${message.user.lastName}]: ${content}`;
    });
  }

  private async llmRequest(prompt: string) {
    const body = {
      model: LLM_NAME,
      messages: [{ role: 'system', content: prompt }],
    } as any;

    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!data) throw new SomethingWentWrongException();

    return data;
  }
}
