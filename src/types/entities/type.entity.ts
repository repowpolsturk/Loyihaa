import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Types {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}
