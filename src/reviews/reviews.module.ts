import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Reviews } from './entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Quizzes } from 'src/quizzes/entities/quiz.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Reviews, User, Quizzes])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
