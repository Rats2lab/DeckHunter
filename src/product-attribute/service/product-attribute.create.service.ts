import { Injectable } from '@nestjs/common';
import { ProductAttribute } from '../interface/product-attribute.interface';
import { ProductAttributeMikroOrmRepository } from '../repository/product-attribute.mikro-orm.repository';
import { ProductAttributeCreate } from '../type/product-attribute.create.type';

@Injectable()
export class ProductAttributeCreateService {
  constructor(
    private readonly productAttributeRepository: ProductAttributeMikroOrmRepository,
  ) {}

  async create(
    productAttributeCreate: ProductAttributeCreate,
  ): Promise<ProductAttribute | undefined> {
    try {
      const createdProductAttribute: ProductAttribute =
        await this.productAttributeRepository.insert(productAttributeCreate);

      return createdProductAttribute;
    } catch (_ignoredException) {
      return undefined;
    }
  }
}
