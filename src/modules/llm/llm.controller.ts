import { Body, Controller, Post } from '@nestjs/common';
import { LLMService } from './llm.service';
import { AskQuestionDto } from './dto/askQuestion.dto';
import { AnalyzeFileDto } from './dto/analyzeFile.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('LLM')
@Controller('llm')
export class LLMController {
  constructor(private readonly LLMService: LLMService) {}

  @ApiOperation({ summary: 'Ask a question about a room' })
  @ApiResponse({ status: 200, description: 'Question processed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post('/askRoomQuestion')
  askQuestion(@Body() askQuestionDto: AskQuestionDto) {
    return this.LLMService.askQuestion(askQuestionDto);
  }

  @ApiOperation({ summary: 'Analyze a file and extract information' })
  @ApiResponse({ status: 200, description: 'File analyzed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid file data.' })
  @Post('/analyzeFile')
  analyzeFile(@Body() analyzeFile: AnalyzeFileDto) {
    return this.LLMService.analyzeFile(analyzeFile);
  }
}
