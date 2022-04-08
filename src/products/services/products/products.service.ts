import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { GenericService } from '../../../common/services/generic.service';

@Injectable()
export class ProductsService extends GenericService<Product> {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {
    super(repository);
  }
}
