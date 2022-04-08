import { StandarEntity } from '../../common/entities/standar.entity';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Category extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
