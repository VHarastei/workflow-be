import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { RoleEnum } from '../enums/role.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z0-9]).{8,}$/, {
    message: 'password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  telegramId: string;

  @IsEnum(RoleEnum)
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  role: RoleEnum;
}
