import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersRoleModule } from './users_role/users_role.module';
import { RolesModule } from './roles/roles.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { TypesModule } from './types/types.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { CategoriesModule } from './categories/categories.module';
import { ResultsModule } from './results/results.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    UsersRoleModule,
    RolesModule,
    QuestionsModule,
    AnswersModule,
    TypesModule,
    QuizzesModule,
    CategoriesModule,
    ResultsModule,
    ReviewsModule,
    AuthModule,
   
  ],
})
export class AppModule {}
