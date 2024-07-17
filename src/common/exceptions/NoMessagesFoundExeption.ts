import { HttpException, HttpStatus } from '@nestjs/common';

export class NoMessagesFoundExeption extends HttpException {
  constructor() {
    super('NO_MESSAGES_FOUND', HttpStatus.NOT_FOUND);
  }
}
