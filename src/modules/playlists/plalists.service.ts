import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from 'songs/entities/song.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UsersService } from 'users/users.service';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songsRepo: Repository<Song>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = createPlaylistDto.name;

    const user = await this.usersService.findById(createPlaylistDto.user);
    playlist.user = user;

    const songs = await this.songsRepo.findBy({
      id: In([...createPlaylistDto.songs]),
    });
    playlist.songs = songs;

    return this.playlistsRepo.save(playlist);
  }
}
