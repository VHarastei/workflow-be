import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessDeniedException extends HttpException {
  constructor() {
    super('ACCESS_DENIED', HttpStatus.FORBIDDEN);
  }
}
