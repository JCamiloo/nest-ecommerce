import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
