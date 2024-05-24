import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import constants from 'common/constants';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    const qb = this.usersRepo.createQueryBuilder('user');
    return paginate<User>(qb, options);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepo.create(createUserDto);
      await this.usersRepo.save(user);
      return user;
    } catch (error) {
      console.log(typeof error.code);
      if (error.code === constants.PG_UNIQUE_VIOLATION_ERROR_CODE) {
        throw new ConflictException('Email already in use.');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepo.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepo.remove(user);
  }
}
