import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiKeyStrategy } from 'auth/strategies/api-key.strategy';

export const ApiBearerAuth = applyDecorators(UseGuards(ApiKeyStrategy));
