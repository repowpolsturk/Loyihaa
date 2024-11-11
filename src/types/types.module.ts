import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { Types } from './entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Types])],
  providers: [TypesService],
  controllers: [TypesController],
})
export class TypesModule {}
