import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { IdDto } from 'common/dtos/id.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}
  @Get()
  async findAll(): Promise<String> {
    return this.songsService.findAll();
  }

  @Get('id')
  async findOne(@Param() { id }: IdDto): Promise<String> {
    return this.songsService.findOne(id);
  }

  @Post()
  async create(): Promise<String> {
    return this.songsService.create();
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
