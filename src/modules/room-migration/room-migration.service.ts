import { Injectable } from '@nestjs/common';
import * as unzipper from 'unzipper';
import { TelegramMessagesData } from './types/room-migration.types';
import { MigrationFileIsEmptyException } from 'src/common/exceptions/MigrationFileIsEmptyException';
import { MigrationMessagesDoesNotExistException } from 'src/common/exceptions/MigrationMessagesDoesNotExistException';
import { Room } from '../room/entities/room.entity';
import { MessageService } from '../message/message.service';
import { UsersService } from '../users/users.service';
import { dumpUnzipperFileToMulterFile } from './utils/dumpUnzipperFileToMulterFile';

const FILES_REGEX = /^([^/]+)\/(files|photos|video_files|voice_messages)\/.+$/;
const MESSAGES_FILE_REGEX = /^.+\/result\.json$/;

@Injectable()
export class RoomMigrationService {
  constructor(
    private messageService: MessageService,
    private usersService: UsersService,
  ) {}

  async extractTelegramHistory(importFile: Express.Multer.File) {
    const mainFolder = await unzipper.Open.buffer(importFile.buffer);

    if (!mainFolder || !mainFolder.files) throw new MigrationFileIsEmptyException();

    const files = mainFolder.files?.filter((d) => d.path.match(FILES_REGEX)) || [];

    const messagesFile = mainFolder.files.find((d) => d.path?.match(MESSAGES_FILE_REGEX));

    if (!messagesFile) throw new MigrationMessagesDoesNotExistException();

    const messagesFileContent = await messagesFile.buffer();
    const messagesFileData: TelegramMessagesData = JSON.parse(messagesFileContent.toString());

    if (!messagesFileData) throw new MigrationMessagesDoesNotExistException();

    return {
      extractedFiles: files,
      mainFolderPath: mainFolder.files[0].path as string,
      extractedMessages: messagesFileData.messages,
    };
  }

  async telegramMigrateRoomHistory(room: Room, importFile: Express.Multer.File) {
    const { extractedFiles, extractedMessages, mainFolderPath } =
      await this.extractTelegramHistory(importFile);

    const promises = extractedMessages
      .filter((m) => m.type === 'message')
      .map(async (message) => {
        const user = await this.usersService.findByTelegramId(message.from_id);
        if (!user) return;

        const getMessageFile = async () => {
          const filePath = message.file || message.photo;
          if (!filePath) return;

          const file = extractedFiles.find((f) => f.path === `${mainFolderPath}${filePath}`);
          if (!file) return;

          return dumpUnzipperFileToMulterFile(
            file,
            message.file_name || message.file || message.photo,
            message.mime_type,
          );
        };

        const messageFile = await getMessageFile();
        const files = messageFile && [messageFile];

        const messageText = message.text_entities.map((entity) => entity.text).join('');
        const messageTextTemplate = { ops: [{ insert: messageText ? messageText : '' }] };

        const createMessageDto = {
          text: JSON.stringify(messageTextTemplate),
          parentMessageId: null,
          createdAt: message.date,
        };

        return this.messageService.create(user.id, room.id, createMessageDto, files);
      });

    return Promise.all(promises);
  }
}
