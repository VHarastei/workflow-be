import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateMessageDto } from './dto/createMessage.dto';
import { ToggleMessageReactionDto } from './dto/toggleMessageReaction.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { MessageService } from './message.service';

@UseGuards(AuthGuard('jwt'))
@Controller('rooms/:roomId/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  s;
  @Post('/sendMessage')
  @UseInterceptors(AnyFilesInterceptor())
  sendMessage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
    @Param('roomId') roomId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.create(req.user.id, roomId, createMessageDto, files);
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

  @Get(':messageId')
  findAllByThread(@Param('messageId') messageId: string) {
    return this.messageService.findAllByThread(messageId);
  }

  @Patch(':messageId/toggle-reaction')
  async toggleReaction(
    @Request() req,
    @Param('messageId') messageId: string,
    @Param('roomId') roomId: string,
    @Body() body: ToggleMessageReactionDto,
  ) {
    return await this.messageService.toggleReaction(req.user.id, roomId, messageId, body);
  }
}
