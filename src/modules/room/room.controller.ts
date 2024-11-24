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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Room } from './entities/room.entity';

@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: 'Create a new room' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create room data, optionally with an import file',
    schema: {
      type: 'object',
      properties: {
        importFile: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @ApiOkResponse({ description: 'Room successfully created', type: Room })
  @ApiResponse({ status: 400, description: 'Invalid data or file format' })
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

  @ApiOperation({ summary: 'Find or create a direct room' })
  @ApiOkResponse({ description: 'Room found or created successfully', type: Room })
  @Post('findOrCreate')
  findOrCreateDirectRoom(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.findOrCreateDirectRoom(req.user.id, createRoomDto);
  }

  @ApiOperation({ summary: 'Get all rooms' })
  @ApiOkResponse({ description: 'List of all rooms', type: [Room] })
  @Get()
  findAll(@Request() req, @Query('projectId') projectId) {
    return this.roomService.findAll(req.user.id, projectId);
  }

  @ApiOperation({ summary: 'Get room by ID' })
  @ApiOkResponse({ description: 'Room details retrieved successfully', type: Room })
  @ApiResponse({ status: 404, description: 'Room not found' })
  @Get(':roomId')
  findOne(@Param('roomId') roomId: string) {
    return this.roomService.findOne(roomId);
  }

  @ApiOperation({ summary: 'Update room details' })
  @ApiOkResponse({ description: 'Room updated successfully', type: Room })
  @ApiResponse({ status: 404, description: 'Room not found' })
  @Patch(':roomId')
  update(@Param('roomId') roomId: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(roomId, updateRoomDto);
  }

  @ApiOperation({ summary: 'Delete room by ID' })
  @ApiResponse({ status: 200, description: 'Room deleted successfully' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  @Delete(':roomId')
  delete(@Param('roomId') roomId: string) {
    return this.roomService.delete(roomId);
  }
}
