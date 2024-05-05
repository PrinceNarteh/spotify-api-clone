import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto, UpdateSongDto } from './dto/song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songsRepository: Repository<Song>,
  ) {}
  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create(createSongDto);
    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });
    if (!song) {
      throw new NotFoundException('Song Not Found');
    }
    return song;
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.songsRepository.preload({
      id,
      updateSongDto,
    });
    if (!song) {
      throw new NotFoundException('Song Not Found');
    }
    return song;
  }

  async delete(id: number): Promise<String> {
    await this.songsRepository.delete(id);
    return `Song Delete successfully`;
  }
}
