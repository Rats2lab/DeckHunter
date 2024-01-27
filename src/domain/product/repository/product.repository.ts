import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';

export abstract class ProductRepository {
  abstract insertOne(productCreate: ProductCreate): Promise<Product>;
}
