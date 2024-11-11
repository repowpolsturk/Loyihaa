import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateAnswerDto {
  @IsOptional()
  @IsString()
  answer_text?: string;

  @IsOptional()
  @IsInt()
  question_id?: number;
}
