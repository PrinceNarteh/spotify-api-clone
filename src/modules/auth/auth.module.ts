import { Module } from '@nestjs/common';
import { UsersModule } from 'users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './strategies/jwt.strategy';
import { ArtistsModule } from 'artists/artists.module';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    PassportModule,
    UsersModule,
    ArtistsModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
    JWTStrategy,
    ApiKeyStrategy,
  ],
  exports: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}
