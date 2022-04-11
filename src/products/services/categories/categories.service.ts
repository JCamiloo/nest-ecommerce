import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericService } from '../../../common/services/generic.service';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService extends GenericService<Category> {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {
    super(repository);
  }

  async findOne(id: number) {
    const item = await this.repository.findOne(id, {
      relations: ['products'],
    });

    if (!item) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return item;
  }
}
