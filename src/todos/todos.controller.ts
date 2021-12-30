import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { UpdateMessage } from './dto/update-todo.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Message } from './todo.entity';

@Controller('messages')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private messageService: TodosService) {}

  @Post('/create')
  createMessage(@Body() body: CreateMessageDto): Promise<Message> {
    return this.messageService.create(body.content);
  }

  @Get('/:id')
  findOneMessage(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(parseInt(id));
  }

  @Get()
  findAllMessages(@CurrentUser() user: User): Promise<object[]> {
    console.log(user);
    return this.messageService.find();
  }

  @Delete('/:id')
  findAndRemove(@Param('id') id: string): Promise<Message> {
    return this.messageService.remove(parseInt(id));
  }

  @Patch('/:id')
  findAndUpdate(
    @Param('id') id: string,
    @Body() body: UpdateMessage,
  ): Promise<Message> {
    return this.messageService.update(parseInt(id), body);
  }
}
