import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private repo: Repository<Message>) {}

  create(content: string) {
    const createdAt = new Date().toISOString();
    const data = this.repo.create({ content, createdAt });

    return this.repo.save(data);
  }

  async findOne(id: number) {
    try {
      const message = await this.repo.findOne(id);
      if (!message) {
        throw new NotFoundException('message not found');
      }
      return message;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  find() {
    return this.repo.find();
  }

  async update(id: number, attributes: Partial<Message>) {
    try {
      const message = await this.findOne(id);
      if (!message) {
        throw new NotFoundException('message not found');
      }
      Object.assign(message, attributes);
      return this.repo.save(message);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: number) {
    try {
      const message = await this.findOne(id);
      if (!message) {
        throw new NotFoundException('message not found');
      }
      return this.repo.remove(message);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
