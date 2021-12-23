import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AssignUserDto } from 'src/users/dto/assign-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(userDto: AssignUserDto) {
    try {
      const existingUser = await this.userService.findByEmail(userDto.email);

      if (existingUser.length) throw new Error('Email already exist');

      const user = await this.userService.create(userDto);

      delete user.password;
      return user;
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  async logIn(email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      if (!bcrypt.compare(user.password, password)) {
        throw new Error('Invalid credentials');
      }
      delete user.password;
      return user;
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  async allUsers() {
    try {
      const user = await this.userService.findAll();

      if (!user.length) throw new Error('No Users Found');
      return user;
    } catch (err) {
      throw new NotFoundException(`${err}`);
    }
  }
}
