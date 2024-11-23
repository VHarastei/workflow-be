import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileDto } from '../users/dto/userProfile.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/registerResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Request() req): UserProfileDto {
    return req.user;
  }
}
