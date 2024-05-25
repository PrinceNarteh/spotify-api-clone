import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register() {
    return this.authService.register();
  }

  async login() {
    return this.authService.login();
  }
}
