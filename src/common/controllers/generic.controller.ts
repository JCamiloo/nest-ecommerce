import { ParseIntPipe, Param, Delete, Get } from '@nestjs/common';
import { GenericService } from '../services/generic.service';

export class GenericController<Entity> {
  constructor(private genericService: GenericService<Entity>) {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.genericService.findOne(id);
  }

  @Get()
  getAll() {
    return this.genericService.findAll();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.genericService.remove(id);
  }
}
