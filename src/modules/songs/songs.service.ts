import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateSongDTO, UpdateSongDTO } from './dto/song.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songsRepository: Repository<Song>,
  ) {}

  async create(createSongDto: CreateSongDTO): Promise<Song> {
    const song = this.songsRepository.create(createSongDto);
    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    return paginate(this.songsRepository, options);
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });
    if (!song) {
      throw new NotFoundException('Song Not Found');
    }
    return song;
  }

  async update(
    id: number,
    updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    const song = await this.songsRepository.update(id, updateSongDTO);
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
