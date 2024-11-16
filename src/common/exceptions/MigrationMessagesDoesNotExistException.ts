import { HttpException, HttpStatus } from '@nestjs/common';

export class MigrationMessagesDoesNotExistException extends HttpException {
  constructor() {
    super('MIGRATION_MESSAGES_DOES_NOT_EXIST', HttpStatus.NOT_FOUND);
  }
}
