import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export type AssistantMessage = {
  id: string;
  text: string;
};

export class AskQuestionDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @IsOptional()
  history: AssistantMessage[];
}
