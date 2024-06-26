import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { IdDto } from 'common/dtos/id.dto';
import { CreateSongDTO, UpdateSongDTO } from './dto/song.dto';
import { Song } from './entities/song.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistGuard } from 'artists/guards/jwt-artist.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @UseGuards(JwtArtistGuard)
  async create(@Body() createSongDto: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDto);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1))
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10))
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit, route: '/songs' });
  }

  @Get(':id')
  async findOne(@Param() { id }: IdDto): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param() { id }: IdDto,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete('id')
  async delete(@Param() { id }: IdDto): Promise<String> {
    return this.songsService.delete(id);
  }
}
