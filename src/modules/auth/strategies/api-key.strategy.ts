import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(apiKey: string) {
    const user = await this.authService.validateUserByApiKey(apiKey);
    console.log({ user });
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
