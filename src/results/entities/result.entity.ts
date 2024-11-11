import { Quizzes } from 'src/quizzes/entities/quiz.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Results {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  total_questions: number;

  @Column()
  correct_answers: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Quizzes)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quizzes;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
