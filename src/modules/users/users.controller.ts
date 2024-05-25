import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IdDto } from 'common/dtos/id.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get(':id')
  async findOne(@Param() { id }: IdDto): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: IdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param() { id }: IdDto): Promise<User> {
    return this.usersService.delete(id);
  }
}
