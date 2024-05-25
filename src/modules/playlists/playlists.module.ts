import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { UsersModule } from 'users/users.module';
import { PlaylistsService } from './plalists.service';
import { PlaylistController } from './playlists.controller';
import { Song } from 'songs/entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song]), UsersModule],
  controllers: [PlaylistController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
