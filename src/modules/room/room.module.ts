import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
