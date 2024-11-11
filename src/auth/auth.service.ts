// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userExists = await this.usersService.findOneByEmail(email);

    if (userExists) {
      throw new UnauthorizedException('Пользователь уже существует');
    }

    const hash_password = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser({ ...createUserDto, password });
    return newUser;
  }

  async login(user: LoginUserDto) {
    const userRecord = await this.usersService.findOneByEmail(user.email);
    if (!userRecord || !(await bcrypt.compare(user.password, userRecord.passwordHash))) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const payload = { email: userRecord.email, sub: userRecord.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findOneByEmail(decoded.email);
      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }
      return {
        access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      };
    } catch (e) {
      throw new UnauthorizedException('Невалидный токен');
    }
  }
}
