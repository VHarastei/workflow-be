import { HttpException, HttpStatus } from '@nestjs/common';

export class FileDoesNotExistException extends HttpException {
  constructor() {
    super('FILE_DOES_NOT_EXIST', HttpStatus.NOT_FOUND);
  }
}
