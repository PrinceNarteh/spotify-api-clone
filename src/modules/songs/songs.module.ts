import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Playlist } from 'playlists/entities/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Playlist])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
