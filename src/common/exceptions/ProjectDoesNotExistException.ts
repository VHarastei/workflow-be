import { HttpException, HttpStatus } from '@nestjs/common';

export class ProjectDoesNotExistException extends HttpException {
  constructor() {
    super('PROJECT_DOES_NOT_EXIST', HttpStatus.NOT_FOUND);
  }
}
