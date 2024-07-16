import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from 'src/common/exceptions/InvalidCredentialsException';
import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/registerResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const user = await this.usersService.create(registerDto);

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.sign(payload);

    const registerResponse = new RegisterResponseDto();
    registerResponse.user = user;
    registerResponse.accessToken = accessToken;

    return registerResponse;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);
    const isPasswordValid = await user.validatePassword(loginDto.password);

    if (!user || !isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.sign(payload);

    const loginResponse = new LoginResponseDto();
    loginResponse.user = user;
    loginResponse.accessToken = accessToken;

    return loginResponse;
  }
}
