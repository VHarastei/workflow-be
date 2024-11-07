import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDoesNotExistException extends HttpException {
  constructor() {
    super('USER_DOES_NOT_EXIST', HttpStatus.NOT_FOUND);
  }
}
