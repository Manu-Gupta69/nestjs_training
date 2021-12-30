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
import { AssignUserDto } from './dto/assign-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userDto: AssignUserDto): Promise<User> {
    try {
      userDto.password = await brcypt.hash(userDto.password, 12);
      const user = this.userRepository.create(userDto);

      return this.userRepository.save(user);
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email });

      if (!user) return null;

      return user;
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }
  async findById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) return null;

      return user;
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  async findOne(email: string): Promise<User> {
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

  async findAll(): Promise<object[]> {
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
