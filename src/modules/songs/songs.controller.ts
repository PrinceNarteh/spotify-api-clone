import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { IdDto } from 'common/dtos/id.dto';
import { CreateSongDto, UpdateSongDto } from './dto/song.dto';
import { Song } from './entities/song.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  async create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }

  @Get()
  async findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get('id')
  async findOne(@Param() { id }: IdDto): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Put('id')
  async update(
    @Param() { id }: IdDto,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete('id')
  async delete(@Param() { id }: IdDto): Promise<String> {
    return this.songsService.delete(id);
  }
}
