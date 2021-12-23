import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(name: string, email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser.length)
      throw new BadRequestException('Email already exist');

    const user = await this.userService.create(name, email, password);

    delete user.password;
    return user;
  }

  async logIn(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!bcrypt.compare(user.password, password)) {
      throw new NotFoundException('Invalid credentials');
    }
    delete user.password;
    return user;
  }

  allUsers() {
    return this.userService.findAll();
  }
}
