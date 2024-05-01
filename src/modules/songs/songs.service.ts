import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  private songs = [];

  async create(createSongDto: CreateSongDto): Promise<CreateSongDto> {
    this.songs.push(createSongDto);
    return createSongDto;
  }

  async findAll(): Promise<CreateSongDto[]> {
    return this.songs;
  }

  async findOne(id: number): Promise<String> {
    return `Find one song with ID ${id}`;
  }

  async update(id: number): Promise<String> {
    return `Update one song with ID ${id}`;
  }

  async delete(id: number): Promise<String> {
    return `Delete one song with ID ${id}`;
  }
}
