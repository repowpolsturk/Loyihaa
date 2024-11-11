import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRoleDto } from './create-users_role.dto';

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {}
