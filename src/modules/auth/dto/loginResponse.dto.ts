import { UserProfileDto } from 'src/modules/users/dto/userProfile.dto';

export class LoginResponseDto {
  user: UserProfileDto;
  accessToken: string;
}
