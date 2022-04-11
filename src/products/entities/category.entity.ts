import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';
import { Product } from './product.entity';

@Entity()
export class Category extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
