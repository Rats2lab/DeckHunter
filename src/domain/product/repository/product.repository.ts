import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductUpdateFields } from '../type/product.update-fields.type';
import { ProductUpdateFilters } from '../type/product.update-filters.type';

export abstract class ProductRepository {
  abstract insertOne(productCreate: ProductCreate): Promise<Product>;

  abstract updateOne(
    productUpdateFilters: ProductUpdateFilters,
    productUpdateFields: ProductUpdateFields,
  ): Promise<Product>;
}
