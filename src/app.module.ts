import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LLMModule } from './modules/llm/llm.module';
import { AuthModule } from './modules/auth/auth.module';
import { DigitalOceanModule } from './modules/digitalocean/digitalocean.module';
import { FileModule } from './modules/file/file.module';
import { MessageModule } from './modules/message/message.module';
import { NodemailerModule } from './modules/nodemailer/nodemailer.module';
import { ProjectModule } from './modules/project/project.module';
import { ReactionModule } from './modules/reaction/reaction.module';
import { RoomMigrationModule } from './modules/room-migration/room-migration.module';
import { RoomModule } from './modules/room/room.module';
import { UsersModule } from './modules/users/users.module';

config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: parseInt(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    AuthModule,
    RoomModule,
    UsersModule,
    MessageModule,
    ProjectModule,
    ReactionModule,
    DigitalOceanModule,
    FileModule,
    RoomMigrationModule,
    LLMModule,
    NodemailerModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'files'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
