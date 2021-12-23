import { IsString } from 'class-validator';

export class UpdateMessage {
  @IsString()
  content: string;
}
