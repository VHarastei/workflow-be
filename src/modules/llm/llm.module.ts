import { Module } from '@nestjs/common';
import { LLMService } from './llm.service';
import { LLMController } from './llm.controller';
import { MessageModule } from '../message/message.module';
import { FileModule } from '../file/file.module';
import { DigitalOceanModule } from '../digitalocean/digitalocean.module';

@Module({
  imports: [MessageModule, FileModule, DigitalOceanModule],
  controllers: [LLMController],
  providers: [LLMService],
})
export class LLMModule {}
