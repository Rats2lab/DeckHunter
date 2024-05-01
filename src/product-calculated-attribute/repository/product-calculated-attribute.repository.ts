import { ProductCalculatedAttribute } from '../interface/product-calculated-attribute.interface';
import { ProductCalculatedAttributeCreate } from '../type/product-calculated-attribute.create.type';

export abstract class ProductCalculatedAttributeRepository {
  abstract insertOne(
    productCalculatedAttributeCreate: ProductCalculatedAttributeCreate,
  ): Promise<ProductCalculatedAttribute>;
}
