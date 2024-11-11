import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsersRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column({ default: false })
  is_creator: boolean;
}
