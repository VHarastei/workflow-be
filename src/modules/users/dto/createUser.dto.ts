import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  //regex for password to contain atleast one uppercase, lowercase, number and special character
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message:
  //     'password must contain uppercase, lowercase, number and special character',
  // })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
