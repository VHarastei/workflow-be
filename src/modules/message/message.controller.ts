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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('rooms/:roomId/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Send a new message in a room' })
  @ApiResponse({ status: 201, description: 'Message sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiParam({ name: 'roomId', description: 'ID of the room to send the message to' })
  @Post('/sendMessage')
  @UseInterceptors(AnyFilesInterceptor())
  sendMessage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
    @Param('roomId') roomId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.create(req.user.id, roomId, createMessageDto, files || []);
  }

  @ApiOperation({ summary: 'Update a specific message' })
  @ApiResponse({ status: 200, description: 'Message updated successfully.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  @ApiParam({ name: 'messageId', description: 'ID of the message to update' })
  @Patch(':messageId')
  updateMessage(
    @Request() req,
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(req.user.id, messageId, updateMessageDto);
  }

  @ApiOperation({ summary: 'Delete a specific message' })
  @ApiResponse({ status: 200, description: 'Message deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  @ApiParam({ name: 'messageId', description: 'ID of the message to delete' })
  @Delete(':messageId')
  deleteMessage(@Request() req, @Param('messageId') id: string) {
    return this.messageService.delete(req.user.id, id);
  }

  @ApiOperation({ summary: 'Find all messages in a room' })
  @ApiResponse({ status: 200, description: 'List of messages retrieved successfully.' })
  @ApiParam({ name: 'roomId', description: 'ID of the room to retrieve messages from' })
  @Get('')
  findAllByRoom(@Param('roomId') roomId: string) {
    return this.messageService.findAll(roomId);
  }

  @ApiOperation({ summary: 'Find all messages in a thread' })
  @ApiResponse({ status: 200, description: 'List of thread messages retrieved successfully.' })
  @ApiParam({
    name: 'messageId',
    description: 'ID of the parent message to retrieve thread messages',
  })
  @Get(':messageId')
  findAllByThread(@Param('messageId') messageId: string) {
    return this.messageService.findAllByThread(messageId);
  }

  @ApiOperation({ summary: 'Toggle a reaction for a specific message' })
  @ApiResponse({ status: 200, description: 'Reaction toggled successfully.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  @ApiParam({ name: 'messageId', description: 'ID of the message to toggle reaction for' })
  @ApiParam({ name: 'roomId', description: 'ID of the room containing the message' })
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
