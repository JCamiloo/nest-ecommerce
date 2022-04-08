import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../../common/services/generic.service';
import { Customer } from '../../entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService extends GenericService<Customer> {
  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
  ) {
    super(repository);
  }
}
