import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateSongDTO, UpdateSongDTO } from './dto/song.dto';
import { Artist } from 'artists/entities/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songsRepository: Repository<Song>,
    @InjectRepository(Artist) private readonly artistsRepo: Repository<Artist>,
  ) {}

  async create(createSongDto: CreateSongDTO): Promise<Song> {
    const artists = await Promise.all(
      createSongDto.artists.map((artist) => this.preloadArtistByName(artist)),
    );
    const song = this.songsRepository.create({
      ...createSongDto,
      artists,
    });
    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('song');
    queryBuilder.orderBy('song.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });
    if (!song) {
      throw new NotFoundException('Song Not Found');
    }
    return song;
  }

  async update(id: number, updateSongDTO: UpdateSongDTO): Promise<Song> {
    const artists =
      updateSongDTO.artists &&
      (await Promise.all(
        updateSongDTO.artists.map((artist) => this.preloadArtistByName(artist)),
      ));
    const song = await this.songsRepository.preload({
      id,
      ...updateSongDTO,
      artists,
    });
    if (!song) {
      throw new NotFoundException('Song Not Found');
    }
    return this.songsRepository.save(song);
  }

  async delete(id: number): Promise<String> {
    await this.songsRepository.delete(id);
    return `Song Delete successfully`;
  }

  private async preloadArtistByName(stageName: string): Promise<Artist> {
    const artist = await this.artistsRepo.findOne({
      where: {
        user: {
          stageName,
        },
      },
    });
    if (!artist) {
      throw new NotFoundException(
        `Artist with the name ${stageName} not found`,
      );
    }
    return artist;
  }
}
