import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as brcypt from 'bcrypt';

@Controller('users')
export class UsersController {}
