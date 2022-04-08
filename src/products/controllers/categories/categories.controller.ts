import {
  Controller,
  ParseIntPipe,
  Param,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../../services/categories/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';
import { GenericController } from '../../../common/controllers/generic.controller';
import { Category } from '../../entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController extends GenericController<Category> {
  constructor(private categoriesService: CategoriesService) {
    super(categoriesService);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }
}
