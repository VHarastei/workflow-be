import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAreadyInUseException extends HttpException {
  constructor() {
    super('EMAIL_ALREADY_IN_USE', HttpStatus.BAD_REQUEST);
  }
}
