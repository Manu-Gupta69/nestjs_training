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

  find() {
    return this.repo.find();
  }

  async update(id: number, attributes: Partial<Message>) {
    try {
      const message = await this.findOne(id);
      if (!message) {
        //
      }
      Object.assign(message, attributes);
      return this.repo.save(message);
    } catch (err) {}
  }
}
