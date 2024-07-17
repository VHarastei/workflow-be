import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { RoomService } from './room.service';

@UseGuards(AuthGuard('jwt'))
@Controller('projects/:projectId/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(@Param('projectId') projectId: string, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(projectId, createRoomDto);
  }

  @Get()
  findAll(@Param('projectId') projectId: string) {
    return this.roomService.findAll(projectId);
  }

  @Get(':roomId')
  findOne(@Param('roomId') roomId: string) {
    return this.roomService.findOne(roomId);
  }

  @Patch(':roomId')
  update(@Param('roomId') roomId: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(roomId, updateRoomDto);
  }

  @Delete(':roomId')
  delete(@Param('roomId') roomId: string) {
    return this.roomService.delete(roomId);
  }
}
