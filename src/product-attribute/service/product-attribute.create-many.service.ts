import { Injectable } from '@nestjs/common';
import { ProductAttribute } from '../interface/product-attribute.interface';
import { ProductAttributeCreate } from '../type/product-attribute.create.type';
import { ProductAttributeCreateService } from './product-attribute.create.service';

@Injectable()
export class ProductAttributeCreateManyService {
  constructor(
    private readonly productAttributeCreateService: ProductAttributeCreateService,
  ) {}

  async createMany(
    productAttributesCreate: ProductAttributeCreate[],
  ): Promise<ProductAttribute[]> {
    const createdProductAttributes: ProductAttribute[] = [];

    for (let productAttributeCreate of productAttributesCreate) {
      try {
        const createdAttribute: ProductAttribute =
          await this.productAttributeCreateService.create(
            productAttributeCreate,
          );

        createdProductAttributes.push(createdAttribute);
      } catch (_ignoredException) {}
    }

    return createdProductAttributes;
  }
}
