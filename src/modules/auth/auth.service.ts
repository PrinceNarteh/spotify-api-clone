import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { LoginDto } from './dto/loginDto';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingServing: HashingService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUserDto) {
    const password = await this.hashingServing.hash(userDto.password);
    const user = await this.usersService.create({ ...userDto, password });
    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto) {
    let user = await this.usersService.findOne({ email: loginDto.email });
    if (
      !user ||
      !(await this.hashingServing.compare(loginDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
