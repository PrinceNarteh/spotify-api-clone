import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
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

  async findOne(options: FindOptionsWhere<User>): Promise<User> {
    const user = await this.usersRepo.findOneBy(options);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepo.save({
        ...createUserDto,
        apiKey: uuid(),
      });
      return user;
    } catch (error) {
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
    const user = await this.findById(id);
    return this.usersRepo.remove(user);
  }

  async updateSecretKey(userId: number, secret: string) {
    return this.usersRepo.update(
      { id: userId },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.usersRepo.update(
      { id: userId },
      { enable2FA: false, twoFASecret: null },
    );
  }

  async findByApiKey(apiKey: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({ apiKey });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
