import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Message) private repo: Repository<Message>) {}

  create(content: string): Promise<Message> {
    try {
      const createdAt = new Date().toISOString();
      const data = this.repo.create({ content, createdAt });

      return this.repo.save(data);
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  async findOne(id: number): Promise<Message> {
    try {
      const message = await this.repo.findOne(id);

      if (!message) {
        throw new NotFoundException('message not found');
      }

      return message;
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  find(): Promise<object[]> {
    return this.repo.find();
  }

  async update(id: number, attributes: Partial<Message>): Promise<Message> {
    try {
      const message = await this.findOne(id);

      if (!message) {
        throw new NotFoundException('message not found');
      }

      Object.assign(message, attributes);
      return this.repo.save(message);
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }

  async remove(id: number): Promise<Message> {
    try {
      const message = await this.findOne(id);

      if (!message) {
        throw new NotFoundException('message not found');
      }

      return this.repo.remove(message);
    } catch (err) {
      throw new BadRequestException(`${err}`);
    }
  }
}
