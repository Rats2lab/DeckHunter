import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product/repository/product.repository';
import { Product } from '../../domain/product/interface/product.interface';
import { ProductFindOneFilters } from '../../domain/product/type/product.find-one-filters.type';

@Injectable()
export class ProductFindOneService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<Product> {
    return this.productRepository.findOne(productFindOneFilters);
  }
}
