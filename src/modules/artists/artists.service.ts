import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepo: Repository<Artist>,
  ) {}

  async findAll(options: FindManyOptions<Artist>): Promise<Artist[]> {
    return this.artistsRepo.find({
      ...options,
      relations: {
        user: true,
      },
    });
  }

  async findArtist(id: number): Promise<Artist> {
    const artist = await this.artistsRepo.findOneBy({ user: { id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async findOne(options: FindOneOptions<Artist>): Promise<Artist> {
    return this.artistsRepo.findOne(options);
  }
}
