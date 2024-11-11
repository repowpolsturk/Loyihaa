import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRole } from './entities/users_role.entity';
import { CreateUserRoleDto } from './dto/create-users_role.dto';
import { UpdateUserRoleDto } from './dto/update-users_role.dto';

@Injectable()
export class UsersRoleService {
  constructor(
    @InjectRepository(UsersRole)
    private usersRoleRepository: Repository<UsersRole>,
  ) {}

  async createUserRole(data: CreateUserRoleDto): Promise<UsersRole> {
    const userRole = this.usersRoleRepository.create(data);
    return this.usersRoleRepository.save(userRole);
  }

  async findAll(): Promise<UsersRole[]> {
    return this.usersRoleRepository.find();
  }

  async findOne(id: number): Promise<UsersRole> {
    return this.usersRoleRepository.findOneBy({ id });
  }

  async updateUserRole(id: number, data: UpdateUserRoleDto): Promise<UsersRole> {
    await this.usersRoleRepository.update(id, data);
    return this.findOne(id);
  }

  async deleteUserRole(id: number): Promise<void> {
    await this.usersRoleRepository.delete(id);
  }
}
