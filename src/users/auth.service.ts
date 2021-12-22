import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string, name: string) {
    const user = await this.userService.create(name, email, password);
    delete user.password;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!bcrypt.compare(user['password'], password)) {
      throw new NotFoundException('Invalid credentials');
    }
    return user;
  }
}
