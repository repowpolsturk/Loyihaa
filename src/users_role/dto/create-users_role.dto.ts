import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  role: string;

  @IsOptional()
  @IsBoolean()
  is_creator?: boolean;
}
