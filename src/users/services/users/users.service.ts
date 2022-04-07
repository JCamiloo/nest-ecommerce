import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { User } from '../../entities/user.entity';
import { ProductsService } from '../../../products/services/products/products.service';
import { Order } from '../../entities/order.entity';
import config from '../../../config/env.config';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'test@mail.com',
      password: 'test123',
      role: 'admin'
    }
  ];

  constructor(
    private productsService: ProductsService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}

  findById(id: number) {
    const product = this.users.find(user => user.id === id);

    if (!product) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return product;
  }

  async getOrdersByUser(id: number): Promise<Order> {
    const user = this.findById(id);

    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll()
    }
  }
}
