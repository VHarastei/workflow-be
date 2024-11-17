import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleReactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  messageId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emoji: string;
}
