import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SendInviationDto {
  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  emails: string[];

  @ApiProperty()
  @IsEnum(RoleEnum)
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  role: RoleEnum;
}
