import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from 'songs/songs.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from 'common/middlewares/logger.middleware';
import { SongsController } from 'songs/songs.controller';
import { PlaylistsModule } from './modules/playlists/playlists.module';

@Module({
  imports: [SongsModule, CommonModule, PlaylistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
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
