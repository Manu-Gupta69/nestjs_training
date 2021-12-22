import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.repo.findOne(id);
  }
}
