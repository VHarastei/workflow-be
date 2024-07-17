import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { RoomService } from './room.service';

@UseGuards(AuthGuard('jwt'))
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }

  // @Post(':roomId/sendMessage')
  // sendMessage(
  //   @Request() req,
  //   @Param('roomId') roomId: string,
  //   @Body() createMessageDto: CreateMessageDto,
  // ) {
  //   return this.messageService.create(req.user.id, roomId, createMessageDto);
  // }

  // @Patch(':roomId/:messageId')
  // updateMessage(
  //   @Request() req,
  //   @Param('messageId') messageId: string,
  //   @Body() updateMessageDto: UpdateMessageDto,
  // ) {
  //   return this.messageService.update(req.user.id, messageId, updateMessageDto);
  // }

  // @Delete(':roomId/:messageId')
  // deleteMessage(@Request() req, @Param('messageId') id: string) {
  //   return this.messageService.delete(req.user.id, id);
  // }

  // @Get(':roomId')
  // findAllByRoom(@Param('roomId') roomId: string) {
  //   return this.messageService.findAll(roomId);
  // }
}
