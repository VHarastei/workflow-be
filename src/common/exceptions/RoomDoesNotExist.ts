import { HttpException, HttpStatus } from '@nestjs/common';

export class RoomDoesNotExist extends HttpException {
  constructor() {
    super('ROOM_DOES_NOT_EXIST', HttpStatus.NOT_FOUND);
  }
}
