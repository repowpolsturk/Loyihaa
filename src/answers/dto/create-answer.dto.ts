import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAnswerDto {
  answer_text: string;
  question_id: number;
  user_id?: number;
}
