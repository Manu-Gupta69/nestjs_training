import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMessage {
  @IsString()
  @IsNotEmpty()
  content: string;
}
