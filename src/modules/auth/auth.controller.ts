import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { LoginDto } from './dto/loginDto';
import { Enable2FAType } from 'types/auth-types';
import { User } from './decorators/user.decorator';
import { UpdateResult } from 'typeorm';
import { JwtAuth } from './decorators/jwt-auth.decorator';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { PayloadType } from 'types/payload.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'It will return accessToken' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('enable-2fa')
  @JwtAuth
  async enable2FA(@User() user: PayloadType): Promise<Enable2FAType> {
    return this.authService.enable2FA(user.userId);
  }

  @Post('disable-2fa')
  @JwtAuth
  async disable2FA(@User() user: PayloadType): Promise<UpdateResult> {
    return this.authService.disable2FA(user.userId);
  }

  @Post('validate-2fa')
  @JwtAuth
  async validate2FA(
    @Body() { token }: ValidateTokenDTO,
    @User() user: PayloadType,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FA(user.userId, token);
  }
}
