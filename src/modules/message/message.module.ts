import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
