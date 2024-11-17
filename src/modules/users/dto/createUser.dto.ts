import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleEnum } from '../enums/role.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  //regex for password to contain atleast one uppercase, lowercase, number and special character
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message:
  //     'password must contain uppercase, lowercase, number and special character',
  // })
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEnum(RoleEnum)
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  role: RoleEnum;
}
