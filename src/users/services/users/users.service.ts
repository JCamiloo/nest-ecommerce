import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../../entities/order';
import { UserEntity } from '../../entities/user.entity';
import { ProductsService } from '../../../products/services/products/products.service';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [
    {
      id: 1,
      email: 'test@mail.com',
      password: 'test123',
      role: 'admin'
    }
  ];

  constructor(private productsService: ProductsService) {}

  findById(id: number) {
    const product = this.users.find(user => user.id === id);

    if (!product) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return product;
  }

  getOrdersByUser(id: number): Order {
    const user = this.findById(id);

    return {
      date: new Date(),
      user,
      products: this.productsService.findAll()
    }
  }
}
