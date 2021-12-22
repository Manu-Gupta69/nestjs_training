import { Controller, Get, Res } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignUserDto } from './dto/sign-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signUp(
      body.name,
      body.email,
      body.password,
    );
    const jwtToken = this.jwtService.sign({ id: user.id });
    response.cookie('jwt', jwtToken, { httpOnly: true });
    return user;
  }

  @Post('/login')
  async signIn(
    @Body() body: SignUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.logIn(body.email, body.password);
    const jwtToken = this.jwtService.sign({ id: user.id });

    response.cookie('jwt', jwtToken, { httpOnly: true });
    return user;
  }

  @Get('/all')
  async getAllUsers() {
    const user = await this.authService.allUsers();
    return user;
  }
}
