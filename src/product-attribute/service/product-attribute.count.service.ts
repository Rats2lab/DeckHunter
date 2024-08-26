import { Injectable } from '@nestjs/common';
import { ProductAttributeMikroOrmRepository } from '../repository/product-attribute.mikro-orm.repository';
import { ProductAttributeCountFilter } from '../type/product-attribute.count-filter.type';

@Injectable()
export class ProductAttributeCountService {
  constructor(
    private readonly productAttributeRepository: ProductAttributeMikroOrmRepository,
  ) {}

  async count(
    productAttributeCountFilter: ProductAttributeCountFilter,
  ): Promise<number> {
    return this.productAttributeRepository.count(productAttributeCountFilter);
  }
}
