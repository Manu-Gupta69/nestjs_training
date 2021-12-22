import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Post('/create')
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
  }
}
