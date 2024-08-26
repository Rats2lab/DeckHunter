import { ProductAttribute } from '../interface/product-attribute.interface';
import { ProductCalculatedAttributeCreate } from '../type/product-attribute.create.type';

export abstract class ProductCalculatedAttributeRepository {
  abstract insertOne(
    productCalculatedAttributeCreate: ProductCalculatedAttributeCreate,
  ): Promise<ProductAttribute>;
}
