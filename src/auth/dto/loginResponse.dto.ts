import { UserProfileDto } from 'src/users/dto/userProfile.dto';

export class LoginResponseDto {
  user: UserProfileDto;
  accessToken: string;
}
