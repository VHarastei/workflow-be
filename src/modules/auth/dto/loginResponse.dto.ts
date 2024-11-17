import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from 'src/modules/users/dto/userProfile.dto';

export class LoginResponseDto {
  @ApiProperty()
  user: UserProfileDto;
  @ApiProperty()
  accessToken: string;
}
