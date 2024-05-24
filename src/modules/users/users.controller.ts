import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1))
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10))
    limit: number = 10,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.usersService.findAll({ page, limit });
  }
}
