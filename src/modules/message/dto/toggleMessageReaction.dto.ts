import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleMessageReactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emoji: string;
}
