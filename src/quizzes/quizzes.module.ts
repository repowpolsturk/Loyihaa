import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { Quizzes } from './entities/quiz.entity';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'src/types/entities/type.entity';
import { Categories } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quizzes, User, Types, Categories])],
  providers: [QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
