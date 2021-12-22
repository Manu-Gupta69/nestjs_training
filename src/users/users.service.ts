import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as brcypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(name: string, email: string, password: string) {
    try {
      const hashPassword = await brcypt.hash(password, 12);
      const user = this.repo.create({
        name,
        email,
        password: hashPassword,
      });

      return this.repo.save(user);
    } catch (err) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findOneById(id: number) {
    try {
      const user = await this.repo.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findOne(email: string) {
    try {
      const user = await this.repo.find({ email });
      if (!user) {
        throw new NotFoundException('Invaild credentials');
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
