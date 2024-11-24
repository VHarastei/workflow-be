import { Injectable } from '@nestjs/common';
import * as unzipper from 'unzipper';
import { TelegramMessagesData, WhatsAppMessage } from './types/room-migration.types';
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
  ) { }

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

  async extractWhatsAppHistory(importFile: Express.Multer.File) {
    const mainFolder = await unzipper.Open.buffer(importFile.buffer);

    if (!mainFolder || !mainFolder.files) {
      throw new MigrationFileIsEmptyException();
    }

    const messagesFile = mainFolder.files.find((d) => d.path?.includes(`${mainFolder.files[0].path as string}`));

    const messagesFileContent = await messagesFile?.buffer();

    if (!messagesFileContent) throw new MigrationMessagesDoesNotExistException();

    const messagesString = messagesFileContent.toString("utf-8");

    const messages = messagesString.split('\n');

    const files = mainFolder.files?.filter((d) => !d.path.includes(`${mainFolder.files[0].path as string}`)) || [];

    return {
      extractedFiles: files,
      mainFolderPath: mainFolder.files[0].path as string,
      extractedMessages: messages,
    };
  }

  async whatsappMigrateRoomHistory(room: Room, importFile: Express.Multer.File) {
    const { extractedFiles, extractedMessages, mainFolderPath } =
      await this.extractWhatsAppHistory(importFile);

    const messages: WhatsAppMessage[] = this.transformMessagesToObjects(extractedMessages);

    const promises = messages
      .map(async (message) => {
        const user = await this.usersService.findByFullName(message.firstName, message.lastName);
        if (!user) return;

        const getMessageFile = async () => {
          const filePath = message.file;
          if (!filePath) return;

          const file = extractedFiles.find((f) => f.path === `${filePath}`);
          if (!file) return;

          return dumpUnzipperFileToMulterFile(
            file,
            message.file,
            message.mime_type,
          );
        };

        const messageFile = await getMessageFile();

        const files = messageFile && [messageFile];

        const messageTextTemplate = { ops: [{ insert: message.text ? message.text : '' }] };

        const createMessageDto = {
          text: JSON.stringify(messageTextTemplate),
          parentMessageId: null,
          createdAt: message.date,
        };

        return this.messageService.create(user.id, room.id, createMessageDto, files);
      });

    return Promise.all(promises);
  }

  getMimeType(extension: string): string {
    const mimeTypes: { [key: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      mp4: "video/mp4",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      pdf: "application/pdf",
      txt: "text/plain",
      json: "application/json",
    };
    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }

  transformMessagesToObjects(messages: string[]) {
    return messages
      .map((message) => {
        const messageRegex = /^(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - ([^:]+):? (.+)?$/;
        const match = message.match(messageRegex);

        if (!match) {
          return null;
        }

        const [_, date, time, sender, content] = match;

        const isoDate = new Date(`${date.split("/").reverse().join("-")}T${time}:00`).toISOString();

        const [firstName, ...lastNameParts] = sender.split(" ");
        const lastName = lastNameParts.join(" ") || '';

        // Handle file attachments
        const fileAttachmentRegex = /^(.+)\.(jpg|jpeg|png|mp4|docx|pdf|txt|json) \(file attached\)$/i;
        const fileMatch = content?.match(fileAttachmentRegex);

        const file = fileMatch ? fileMatch[1] + '.' + fileMatch[2] : null;
        const fileMimeType = fileMatch
          ? this.getMimeType(fileMatch[2])
          : null;

        return {
          firstName: firstName || "",
          lastName: lastName || "",
          date: isoDate,
          text: fileMatch ? "" : content,
          file: file,
          mime_type: fileMimeType,
        };
      })
      .filter((msg) => msg !== null && msg.firstName !== "Messages");
  }

}
