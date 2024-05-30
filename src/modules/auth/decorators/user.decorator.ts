import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator((data: unknown, req: Request) => {
  return req.user;
});
