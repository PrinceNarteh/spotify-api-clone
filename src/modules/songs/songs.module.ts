import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Playlist } from 'playlists/entities/playlist.entity';
import { Artist } from 'artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist, Playlist])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule { }
