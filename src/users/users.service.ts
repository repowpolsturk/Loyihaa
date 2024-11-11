import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  create: any;
  findOne: any;
  update: any;
  remove: any;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Создание пользователя
  async createUser(data: CreateUserDto): Promise<User> {
    try {
      this.logger.log(`Creating user with email: ${data.email}`);

      const existingUser = await this.findOneByEmail(data.email);
      if (existingUser) {
        this.logger.warn(`User with email ${data.email} already exists`);
        throw new ConflictException('User with this email already exists');
      }

      const user = this.usersRepository.create(data);
      const savedUser = await this.usersRepository.save(user);

      this.logger.log(`User created successfully with id: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  // Поиск пользователя по email
  async findOneByEmail(email: string): Promise<User | undefined> {
    this.logger.log(`Looking for user with email: ${email}`);
    return this.usersRepository.findOne({ where: { email } });
  }

  // Поиск пользователя по id
  async findOneById(id: number): Promise<User | undefined> {
    this.logger.log(`Looking for user with id: ${id}`);
    return this.usersRepository.findOne({ where: { id } });
  }

  // Получение всех пользователей
  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.usersRepository.find();
  }

  // Обновление пользователя
  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    try {
      this.logger.log(`Updating user with id ${id}`);

      const user = await this.findOneById(id);
      if (!user) {
        this.logger.error(`User with id ${id} not found`);
        throw new NotFoundException(`User with id ${id} not found`);
      }

      await this.usersRepository.update(id, data);
      const updatedUser = await this.findOneById(id);

      this.logger.log(`User with id ${id} updated successfully`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      throw error;
    }
  }

  // Удаление пользователя
  async deleteUser(id: number): Promise<{ message: string }> {
    try {
      this.logger.log(`Deleting user with id ${id}`);

      const user = await this.findOneById(id);
      if (!user) {
        this.logger.error(`User with id ${id} not found`);
        throw new NotFoundException(`User with id ${id} not found`);
      }

      await this.usersRepository.delete(id);
      this.logger.log(`User with id ${id} deleted successfully`);
      return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`);
      throw error;
    }
  }

  // Метод для поиска пользователя по email для использования в AuthService
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOneByEmail(email);
  }

  // Метод для поиска пользователя по id для использования в AuthService
  async findById(id: number): Promise<User | undefined> {
    return this.findOneById(id);
  }
}
