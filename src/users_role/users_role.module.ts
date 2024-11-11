import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRoleService } from './users_role.service';
import { UsersRoleController } from './users_role.controller';
import { UsersRole } from './entities/users_role.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UsersRole])], 
  providers: [UsersRoleService],
  controllers: [UsersRoleController],
  exports: [UsersRoleService],
})
export class UsersRoleModule {}
