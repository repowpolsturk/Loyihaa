import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Questions } from './entities/question.entity';
import { getEnabledCategories } from 'trace_events';
import { Quizzes } from 'src/quizzes/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, getEnabledCategories, Quizzes])],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
