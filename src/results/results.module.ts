import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Results } from './entities/result.entity';
import { User } from 'src/users/entities/user.entity';
import { Quizzes } from 'src/quizzes/entities/quiz.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Results, User, Quizzes])],
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
