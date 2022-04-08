import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenericController } from '../../../common/controllers/generic.controller';
import { Brand } from '../../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../../dtos/brand.dto';
import { BrandsService } from '../../services/brands/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController extends GenericController<Brand> {
  constructor(private brandsService: BrandsService) {
    super(brandsService);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }
}
