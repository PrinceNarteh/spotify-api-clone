import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { LoginDto } from './dto/loginDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Enable2FAType } from 'types/auth-types';
import { User } from './decorators/user.decorator';
import { UpdateResult } from 'typeorm';

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
  async enable2FA(@User() user): Promise<Enable2FAType> {
    return this.authService.enable2FA(user.id);
  }

  @Post('disable-2fa')
  @UseGuards(JwtAuthGuard)
  async disable2FA(@User() user): Promise<UpdateResult> {
    return this.authService.disable2FA(user.id);
  }
}
