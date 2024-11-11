export class UpdateQuestionDto {
    question_text?: string;
    options?: string[];
    correct_option?: string;
    category_id?: number;
    quiz_id?: number;
  }
  