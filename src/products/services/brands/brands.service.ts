import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../../common/services/generic.service';
import { Brand } from '../../entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService extends GenericService<Brand> {
  constructor(@InjectRepository(Brand) private repository: Repository<Brand>) {
    super(repository);
  }

  async findOne(id: number) {
    const brand = await this.repository.findOne(id, {
      relations: ['products'],
    });

    if (!brand) {
      throw new NotFoundException(`Item #${id} not found`);
    }

    return brand;
  }
}
