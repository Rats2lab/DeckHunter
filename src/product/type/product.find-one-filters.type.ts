import { Product } from '../interface/product.interface';

type ProductFindById = Pick<Product, 'id'>;

type ProductFindByExternalId = Pick<Product, 'providerExternalId' | 'provider'>;

export type ProductFindOneFilters = (
  | (Required<ProductFindById> & Partial<ProductFindByExternalId>)
  | (Partial<ProductFindById> & Required<ProductFindByExternalId>)
) & {
  language?: string;
};
