import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../../dtos/product.dto';
import { Category } from '../../entities/category.entity';
import { Brand } from '../../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  findAll(params: FilterProductsDto) {
    if (params) {
      const { limit, offset } = params;

      return this.repository.find({
        relations: ['brand'],
        take: limit,
        skip: offset,
      });
    }

    return this.repository.find({ relations: ['brand'] });
  }

  async findOne(id: number, withRelations = false) {
    const product = await this.repository.findOne(id, {
      relations: withRelations ? ['brand', 'categories'] : [],
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  async create(data: CreateProductDto) {
    const product = await this.repository.find({ where: { name: data.name } });

    if (product.length > 0) {
      throw new BadRequestException('Product name already exists');
    }

    const newProduct = this.repository.create(data);

    const brand = await this.brandRepository.findOne(data.brandId);
    newProduct.brand = brand;

    const categories = await this.categoryRepository.findByIds(
      data.categoriesId,
    );

    newProduct.categories = categories;

    return this.repository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id, true);

    if (changes.brandId) {
      const brand = await this.brandRepository.findOne(changes.brandId);
      product.brand = brand;
    }

    if (changes.categoriesId) {
      const categories = await this.categoryRepository.findByIds(
        changes.categoriesId,
      );

      product.categories = categories;
    }

    this.repository.merge(product, changes);

    return this.repository.save(product);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }

  async removeProductCategory(productId: number, categoryId: number) {
    const product = await this.findOne(productId, true);

    product.categories = product.categories.filter(
      (category) => category.id !== categoryId,
    );

    return this.repository.save(product);
  }

  async addProductCategory(productId: number, categoryId: number) {
    const product = await this.findOne(productId, true);
    const category = await this.categoryRepository.findOne(categoryId);

    if (!category) {
      throw new NotFoundException('Category does not exist');
    }

    product.categories.push(category);

    return this.repository.save(product);
  }
}
