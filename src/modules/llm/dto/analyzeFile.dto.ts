import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeFileDto {
  @IsString()
  @IsNotEmpty()
  fileId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
