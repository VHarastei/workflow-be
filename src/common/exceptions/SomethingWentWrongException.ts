import { HttpException, HttpStatus } from '@nestjs/common';

export class SomethingWentWrongException extends HttpException {
  constructor() {
    super('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
  }
}
