import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class newPostDto {
    @IsNotEmpty()
    post: string;
}