import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from 'songs/songs.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from 'common/middlewares/logger.middleware';
import { SongsController } from 'songs/songs.controller';
import { DataSource } from 'typeorm';
import { DatabaseModule } from 'database/database.module';
import { EnvModule } from 'env/env.module';
import { PlaylistsModule } from 'playlists/playlists.module';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    SongsModule,
    CommonModule,
    PlaylistsModule,
    UsersModule,
    ArtistsModule,
    AuthModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly dataSource: DataSource) {
    console.log(
      `Database "${dataSource.driver.database}" connected successfully!`,
    );
  }
  configure(consumer: MiddlewareConsumer) {
    // option 1
    // consumer.apply(LoggerMiddleware).forRoutes('songs');
    //
    // option 2
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'songs',
    //   method: RequestMethod.POST,
    // });
    //
    // option 3
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);

    // Exclude routes from middleware
    // consumer.apply(LoggerMiddleware).exclude('/login', 'register');
  }
}
