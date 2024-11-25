import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { RoomTypeEnum } from '../enums/roomType.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RoomImportSourceEnum } from '../enums/roomImportSource.enum';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  projectId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  topic: string;

  @ApiProperty()
  @IsEnum(RoomTypeEnum)
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  type: RoomTypeEnum;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RoomImportSourceEnum)
  @Transform(({ value }) => value.toString())
  importSource: RoomImportSourceEnum;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsUUID(undefined, {
    each: true,
    message: 'Each participant must be a valid UUID',
  })
  @IsNotEmpty()
  participants: string[];
}
