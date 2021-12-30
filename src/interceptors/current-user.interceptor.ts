import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    try {
      const request = context.switchToHttp().getRequest();
      const cookie = request.cookies['jwt'];
      if (cookie) {
        const { id } = await this.jwtService.verifyAsync(cookie);
        const user = await this.usersService.findById(id);

        if (user) delete user.password;

        request.currentUser = user;
      }

      return handler.handle();
    } catch (err) {
      throw new InternalServerErrorException(`${err}`);
    }
  }
}
