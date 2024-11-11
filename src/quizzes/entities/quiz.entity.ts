import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'src/types/entities/type.entity';
import { Categories } from 'src/categories/entities/category.entity';

@Entity()
export class Quizzes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  duration: number; 

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(() => Types)
  @JoinColumn({ name: 'type_id' })
  type: Types;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'category_id' })
  category: Categories;
}
