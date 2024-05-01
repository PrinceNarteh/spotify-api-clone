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
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  async create(@Body() createSongDto: CreateSongDto): Promise<CreateSongDto> {
    console.log({ createSongDto });
    return this.songsService.create(createSongDto);
  }

  @Get()
  async findAll(): Promise<CreateSongDto[]> {
    return this.songsService.findAll();
  }

  @Get('id')
  async findOne(@Param() { id }: IdDto): Promise<String> {
    return this.songsService.findOne(id);
  }

  @Put('id')
  async update(@Param() { id }: IdDto): Promise<String> {
    return this.songsService.update(id);
  }

  @Delete('id')
  async delete(@Param() { id }: IdDto): Promise<String> {
    return this.songsService.delete(id);
  }
}
