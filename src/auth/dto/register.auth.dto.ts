import { IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @Length(8, 32)
  password: string;
}

export class LoginDto extends RegisterDto {}