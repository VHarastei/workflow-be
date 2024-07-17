import { HttpException, HttpStatus } from '@nestjs/common';

export class NoProjectsFoundException extends HttpException {
  constructor() {
    super('NO_PROJECTS_FOUND', HttpStatus.NOT_FOUND);
  }
}
