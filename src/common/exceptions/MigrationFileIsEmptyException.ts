import { HttpException, HttpStatus } from '@nestjs/common';

export class MigrationFileIsEmptyException extends HttpException {
  constructor() {
    super('MIGRATION_FILE_IS_EMPTY', HttpStatus.NO_CONTENT);
  }
}
