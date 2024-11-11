import { Categories } from 'src/categories/entities/category.entity';
import { Quizzes } from 'src/quizzes/entities/quiz.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_text: string;

  @Column('simple-array')
  options: string[];

  @Column()
  correct_option: string;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToOne(() => Quizzes)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quizzes;
}
