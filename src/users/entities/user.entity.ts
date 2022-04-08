import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';

@Entity()
export class User extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;
}
