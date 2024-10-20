import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { EmailAreadyInUseException } from 'src/common/exceptions/EmailAreadyInUseException';
import { QueryFailedError } from 'typeorm';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/registerResponse.dto';
import { UserProfileDto } from '../users/dto/userProfile.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    try {
      return await this.authService.register(registerDto);
    } catch (error: any) {
      console.log('error', error);
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new EmailAreadyInUseException();
      }

      throw error;
    }
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
