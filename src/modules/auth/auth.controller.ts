import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { LoginDto } from './dto/loginDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Enable2FAType } from 'types/auth-types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('enable-2fa')
  @UseGuards(JwtAuthGuard)
  async enable2FA(@Request() req): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.id);
  }
}
