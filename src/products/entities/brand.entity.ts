import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';
import { Product } from './product.entity';

@Entity({ name: 'brands' })
export class Brand extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
