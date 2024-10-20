import { RoleEnum } from '../enums/role.enum';

export class UserProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
}
