import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: ProductEntity[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'lorem ipsum',
      price: 10000,
      stock: 300,
      image: 'https://www.google.com/'
    },
    {
      id: 2,
      name: 'Produc 2',
      description: 'lorem ipsum',
      price: 15000,
      stock: 200,
      image: 'https://www.google.com/'
    }
  ]

  findAll() {
    return this.products;
  }

  findById(id: number) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }
}
