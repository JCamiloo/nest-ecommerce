import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';

@Entity()
export class Brand extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  image: string;
}
