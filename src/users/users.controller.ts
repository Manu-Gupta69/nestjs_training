import { Controller, Get, Req, Res } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { SignUserDto } from './dto/sign-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AssignUserDto } from './dto/assign-user.dto';

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
      new AssignUserDto(body.name, body.email, body.password),
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

  @Get()
  async getAllUsers() {
    const user = await this.authService.allUsers();

    return user;
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }
}
