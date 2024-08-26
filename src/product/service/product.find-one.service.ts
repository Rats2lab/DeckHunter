import { Injectable } from '@nestjs/common';
import { ProductWithRelations } from '../interface/product.with-relations.interface';
import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';
import { ProductFindOneFilters } from '../type/product.find-one-filters.type';

@Injectable()
export class ProductFindOneService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<ProductWithRelations> {
    return this.productRepository.findOne(productFindOneFilters);
  }
}
