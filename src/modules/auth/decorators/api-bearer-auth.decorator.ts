import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const ApiBearerAuth = applyDecorators(UseGuards(AuthGuard('bearer')));
