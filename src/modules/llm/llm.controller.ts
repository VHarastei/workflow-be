import { Body, Controller, Post } from '@nestjs/common';
import { LLMService } from './llm.service';
import { AskQuestionDto } from './dto/askQuestion.dto';
import { AnalyzeFileDto } from './dto/analyzeFile.dto';

@Controller('llm')
export class LLMController {
  constructor(private readonly LLMService: LLMService) {}

  @Post('/askRoomQuestion')
  askQuestion(@Body() askQuestionDto: AskQuestionDto) {
    return this.LLMService.askQuestion(askQuestionDto);
  }

  @Post('/analyzeFile')
  analyzeFile(@Body() analyzeFile: AnalyzeFileDto) {
    return this.LLMService.analyzeFile(analyzeFile);
  }
}
