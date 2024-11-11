import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersRoleService } from './users_role.service';
import { CreateUserRoleDto } from './dto/create-users_role.dto';
import { UsersRole } from './entities/users_role.entity';
import { UpdateUserRoleDto } from './dto/update-users_role.dto';


@Controller('users-role')
export class UsersRoleController {
  constructor(private readonly usersRoleService: UsersRoleService) {}

  @Post()
  createUserRole(@Body() data: CreateUserRoleDto): Promise<UsersRole> {
    return this.usersRoleService.createUserRole(data);
  }

  @Get()
  findAll(): Promise<UsersRole[]> {
    return this.usersRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UsersRole> {
    return this.usersRoleService.findOne(id);
  }

  @Put(':id')
  updateUserRole(
    @Param('id') id: number,
    @Body() data: UpdateUserRoleDto,
  ): Promise<UsersRole> {
    return this.usersRoleService.updateUserRole(id, data);
  }

  @Delete(':id')
  deleteUserRole(@Param('id') id: number): Promise<void> {
    return this.usersRoleService.deleteUserRole(id);
  }
}
