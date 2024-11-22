import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { AskQuestionDto } from './dto/askQuestion.dto';
import { SomethingWentWrongException } from 'src/common/exceptions/SomethingWentWrongException';
import Handlebars from 'handlebars';
import { PROMPT } from './constants/prompt';

@Injectable()
export class AiAssistantService {
  constructor(private messageService: MessageService) {}
  async askQuestion(askQuestionDto: AskQuestionDto) {
    const roomHistory = await this.getRoomHistory(askQuestionDto.roomId);

    const template = Handlebars.compile(PROMPT);
    const promptData = { roomHistory, userMessage: askQuestionDto.text };
    const prompt = template(promptData);

    const body = {
      model: 'llama-3.2-1b-instruct',
      messages: [{ role: 'system', content: prompt }],
    } as any;

    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!data) throw new SomethingWentWrongException();

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
}
