import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', () => {
  const config = {
    type: 'postgres',
    url: process.env.DB_URL,
    autoLoadEntities: true,
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
