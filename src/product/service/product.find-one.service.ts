import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../interface/product.interface';
import { ProductFindOneFilters } from '../type/product.find-one-filters.type';

@Injectable()
export class ProductFindOneService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<Product> {
    return this.productRepository.findOne(productFindOneFilters);
  }
}
