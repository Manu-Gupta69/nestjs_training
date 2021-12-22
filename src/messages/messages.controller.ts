import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('/create')
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.create(body.content);
  }
}
