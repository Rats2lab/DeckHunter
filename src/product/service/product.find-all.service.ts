import { Injectable } from '@nestjs/common';
import { ProductWithRelations } from '../interface/product.with-relations.interface';
import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';
import { ProductFindFilters } from '../type/product.find-filters.type';

@Injectable()
export class ProductFindAllService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async findAll(
    productFindFilters: ProductFindFilters,
  ): Promise<ProductWithRelations[]> {
    return this.productRepository.findAll(productFindFilters);
  }
}
