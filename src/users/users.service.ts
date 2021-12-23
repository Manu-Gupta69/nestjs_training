import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as brcypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(name: string, email: string, password: string) {
    try {
      const hashPassword = await brcypt.hash(password, 12);
      const user = this.userRepository.create({
        name,
        email,
        password: hashPassword,
      });

      return this.userRepository.save(user);
    } catch (err) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.find({ email });

    return user;
  }
  async findById(id: number) {
    const user = await this.userRepository.findOne(id);

    return user;
  }

  async findOne(email: string) {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        throw new Error('Invaild credentials');
      }

      return user;
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  async findAll() {
    try {
      const user = await this.userRepository.find();

      if (!user) {
        throw new NotFoundException('Invaild credentials');
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
