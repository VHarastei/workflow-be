import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { ReactionModule } from '../reaction/reaction.module';
import { DigitalOceanModule } from '../digitalocean/digitalocean.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ReactionModule, DigitalOceanModule, FileModule],
  providers: [MessageService],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
