import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { RoomService } from './room.service';

@UseGuards(AuthGuard('jwt'))
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(@Query('projectId') projectId, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(projectId, createRoomDto);
  }

  @Get()
  findAll(@Request() req, @Query('projectId') projectId) {
    return this.roomService.findAll(req.user.id, projectId);
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
