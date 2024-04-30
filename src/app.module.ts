import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from 'songs/songs.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [SongsModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
