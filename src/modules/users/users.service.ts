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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import constants from 'common/constants';

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
}
