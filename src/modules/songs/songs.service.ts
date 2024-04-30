import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  async create(): Promise<String> {
    return 'Create new song';
  }

  async findAll(): Promise<String> {
    return 'Find all songs';
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
