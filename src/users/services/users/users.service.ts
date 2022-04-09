import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../../common/services/generic.service';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';
import { CreateUserDto } from '../../dtos/user.dto';

@Injectable()
export class UsersService extends GenericService<User> {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private customerService: CustomersService,
  ) {
    super(repository);
  }

  findAll() {
    return this.repository.find({
      relations: ['customer'],
    });
  }

  async create(data: CreateUserDto) {
    const newUser = this.repository.create(data);

    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }

    return this.repository.save(newUser);
  }
}
