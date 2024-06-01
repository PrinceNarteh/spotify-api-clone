import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiKeyStrategy } from 'auth/strategies/api-key.strategy';

export const ApiBearAuth = applyDecorators(UseGuards(ApiKeyStrategy));
