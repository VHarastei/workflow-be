import { Module } from '@nestjs/common';
import { RoomMigrationService } from './room-migration.service';
import { MessageModule } from '../message/message.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MessageModule, UsersModule],
  controllers: [],
  providers: [RoomMigrationService],
  exports: [RoomMigrationService],
})
export class RoomMigrationModule {}
