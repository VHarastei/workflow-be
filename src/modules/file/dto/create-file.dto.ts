import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  path: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filename: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mimetype: string;
}
