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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { RoomService } from './room.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard('jwt'))
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('importFile', {
      fileFilter: (_, file, callback) => {
        if (!file.mimetype.match(/\/(zip)$/)) {
          return callback(new Error('Only zip file format is allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  createRoom(
    @Request() req,
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFile() importFile?: Express.Multer.File,
  ) {
    return this.roomService.create(req.user.id, createRoomDto, importFile);
  }

  @Post('findOrCreate')
  findOrCreateDirectRoom(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.findOrCreateDirectRoom(req.user.id, createRoomDto);
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
