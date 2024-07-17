import { HttpException, HttpStatus } from '@nestjs/common';

export class MessageDoesNotExist extends HttpException {
  constructor() {
    super('MESSAGE_DOES_NOT_EXIST', HttpStatus.NOT_FOUND);
  }
}
