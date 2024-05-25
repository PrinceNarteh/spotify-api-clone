import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { LoginDto } from './dto/loginDto';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingServing: HashingService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUserDto) {
    const password = await this.hashingServing.hash(userDto.password);
    const user = await this.usersService.create({ ...userDto, password });
    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    let user = await this.usersService.findOne({ email: loginDto.email });
    if (
      !user ||
      !(await this.hashingServing.compare(loginDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
