import { Controller, Get, NotFoundException, Req, Res } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { SignUserDto } from './dto/sign-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AssignUserDto } from './dto/assign-user.dto';
import { User } from './user.entity';

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
  ): Promise<User> {
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
  ): Promise<User> {
    const user = await this.authService.logIn(body.email, body.password);
    const jwtToken = this.jwtService.sign({ id: user.id });

    response.cookie('jwt', jwtToken, { httpOnly: true });
    return user;
  }

  @Get()
  async getAllUsers(): Promise<object[]> {
    try {
      const user = await this.authService.allUsers();
      return user;
    } catch (err) {
      throw new NotFoundException(`${err}`);
    }
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response): Promise<{}> {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }
}
