import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GenericService } from '../../../common/services/generic.service';
import { User } from '../../entities/user.entity';
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
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }

    return this.repository.save(newUser);
  }

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }
}
