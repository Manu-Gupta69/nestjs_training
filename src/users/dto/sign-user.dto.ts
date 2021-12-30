import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
