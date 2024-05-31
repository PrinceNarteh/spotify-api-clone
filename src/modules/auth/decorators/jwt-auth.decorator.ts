import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';

export const JwtAuth = applyDecorators(UseGuards(JwtAuthGuard));
