import { Body, Controller, Post } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { AskQuestionDto } from './dto/askQuestion.dto';

@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post()
  askQuestion(@Body() askQuestionDto: AskQuestionDto) {
    return this.aiAssistantService.askQuestion(askQuestionDto);
  }
}
