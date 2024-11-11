// login.auth.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()  // Проверка на email
  email: string;

  @IsString()  // Проверка на строку
  password: string;
}
