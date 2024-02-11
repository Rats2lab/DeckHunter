import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductFindOneFilters } from '../type/product.find-one-filters.type';

export abstract class ProductRepository {
  abstract findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<Product>;

  abstract findAll(): Promise<Product[]>;

  abstract insertOne(productCreate: ProductCreate): Promise<Product>;
}
