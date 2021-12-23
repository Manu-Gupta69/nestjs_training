import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
