import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsUUID(undefined, {
    each: true,
    message: 'Each participant must be a valid UUID',
  })
  participants: string[];
}
