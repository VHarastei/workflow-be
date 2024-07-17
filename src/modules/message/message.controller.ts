import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { MessageService } from './message.service';

@UseGuards(AuthGuard('jwt'))
@Controller('projects/:projectId/rooms/:roomId')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/sendMessage')
  sendMessage(
    @Request() req,
    @Param('roomId') roomId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.create(req.user.id, roomId, createMessageDto);
  }

  @Patch(':messageId')
  updateMessage(
    @Request() req,
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(req.user.id, messageId, updateMessageDto);
  }

  @Delete(':messageId')
  deleteMessage(@Request() req, @Param('messageId') id: string) {
    return this.messageService.delete(req.user.id, id);
  }

  @Get('')
  findAllByRoom(@Param('roomId') roomId: string) {
    return this.messageService.findAll(roomId);
  }
}
