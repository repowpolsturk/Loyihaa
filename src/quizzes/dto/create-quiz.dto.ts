export class CreateQuizDto {
    title: string;
    description?: string;
    duration: number; 
    creator_id: number;
    type_id: number; 
    category_id: number; 
  }
  