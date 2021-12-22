import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { UpdateMessage } from './dto/update-message.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('/create')
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.create(body.content);
  }

  @Get('/:id')
  findOneMessage(@Param('id') id: string) {
    return this.messageService.findOne(parseInt(id));
  }

  @Get()
  findAllMessages(@CurrentUser() user: User) {
    console.log(user);
    return this.messageService.find();
  }

  @Delete('/:id')
  findAndRemove(@Param('id') id: string) {
    return this.messageService.remove(parseInt(id));
  }

  @Patch('/:id')
  findAndUpdate(@Param('id') id: string, @Body() body: UpdateMessage) {
    return this.messageService.update(parseInt(id), body);
  }
}
