import { NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

export abstract class GenericService<Entity> {
  constructor(private genericRepository: Repository<Entity>) {}

  findAll() {
    return this.genericRepository.find();
  }

  async findOne(id: number) {
    const item = await this.genericRepository.findOne(id);

    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }

    return item;
  }

  create(data: DeepPartial<Entity>) {
    const newItem = this.genericRepository.create(
      data as unknown as DeepPartial<Entity>,
    );

    return this.genericRepository.save(newItem as DeepPartial<Entity>);
  }

  async update(id: number, changes: DeepPartial<Entity>) {
    const item = await this.genericRepository.findOne(id);
    this.genericRepository.merge(
      item,
      changes as unknown as DeepPartial<Entity>,
    );

    return this.genericRepository.save(item as DeepPartial<Entity>);
  }

  remove(id: number) {
    return this.genericRepository.delete(id);
  }
}
