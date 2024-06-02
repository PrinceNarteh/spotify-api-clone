import { Controller, Get, Param } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { IdDto } from 'common/dtos/id.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll({});
  }

  @Get(':id')
  async findArtist(@Param() { id }: IdDto): Promise<Artist> {
    return this.artistService.findArtist(id);
  }
}
