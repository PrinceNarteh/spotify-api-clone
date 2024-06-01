import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from 'app.service';
import { ApiBearerAuth } from 'auth/decorators/api-bearer-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @ApiBearerAuth
  getProfile(@Request() req) {
    return req.user;
  }
}
