import { ProductCreate } from '../type/product.create.type';

export interface ProductTransformableObject {
  toProduct(): ProductCreate;
}
