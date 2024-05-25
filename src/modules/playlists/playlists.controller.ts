import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './plalists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  async create(
    @Body() createPlayListDto: CreatePlaylistDto,
  ): Promise<Playlist> {
    return this.playlistsService.create(createPlayListDto);
  }
}
