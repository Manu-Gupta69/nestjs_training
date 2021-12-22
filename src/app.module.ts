import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/message.entity';

@Module({
  imports: [
    MessagesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DATABASE,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USERNAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Message],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
