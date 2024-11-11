import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer_text: string;

  @Column()
  question_id: number;

  @Column({ nullable: true })
  user_id: number;
}
