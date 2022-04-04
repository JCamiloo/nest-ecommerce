import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserEntity } from '../../entities/user.entity';
import { ProductsService } from '../../../products/services/products/products.service';
import { OrderEntity } from '../../entities/order.entity';
import config from '../../../config';

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

  getOrdersByUser(id: number): OrderEntity {
    const user = this.findById(id);

    return {
      date: new Date(),
      user,
      products: this.productsService.findAll()
    }
  }
}
