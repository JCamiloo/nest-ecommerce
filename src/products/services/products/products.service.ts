import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = this.repository.create(data);

    return this.repository.save(newProduct)
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.repository.findOne(id);
    this.repository.merge(product, changes);

    return this.repository.save(product);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
