import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomMigrationModule } from '../room-migration/room-migration.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User]), RoomMigrationModule],
  exports: [RoomService],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
