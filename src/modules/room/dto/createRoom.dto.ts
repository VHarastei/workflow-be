import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { RoomTypeEnum } from '../enums/roomType.enum';
import { Transform } from 'class-transformer';

export class CreateRoomDto {
  @IsString()
  @IsOptional()
  projectId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  topic: string;

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
