import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleMessageReactionDto {
  @IsString()
  @IsNotEmpty()
  emoji: string;
}
