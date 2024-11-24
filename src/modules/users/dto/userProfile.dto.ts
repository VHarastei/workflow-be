import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enums/role.enum';

export class UserProfileDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  role: RoleEnum;
}
