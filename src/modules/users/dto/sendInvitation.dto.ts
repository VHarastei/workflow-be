import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../enums/role.enum';

export class SendInviationDto {
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  emails: string[];

  @IsEnum(RoleEnum)
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  role: RoleEnum;
}
