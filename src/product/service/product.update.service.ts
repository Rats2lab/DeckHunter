import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductUpdateFields } from '../type/product.update-fields.type';

import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';
import { ProductUpdateFilters } from '../type/product.update-filters.type';

@Injectable()
export class ProductUpdateService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async update(
    productUpdateFilters: ProductUpdateFilters,
    productUpdateFields: ProductUpdateFields,
  ): Promise<Product> {
    return this.productRepository.update(
      productUpdateFilters,
      productUpdateFields,
    );
  }
}
