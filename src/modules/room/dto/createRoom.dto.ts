import { IsArray, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { RoomTypeEnum } from '../enums/roomType.enum';
import { Transform } from 'class-transformer';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsEnum(RoomTypeEnum)
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  type: RoomTypeEnum;

  @IsArray()
  @IsString({ each: true })
  @IsUUID(undefined, {
    each: true,
    message: 'Each participant must be a valid UUID',
  })
  @IsNotEmpty()
  participants: string[];
}
