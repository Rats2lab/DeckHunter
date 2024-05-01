import { ProductCalculatedAttribute } from '../interface/product-calculated-attribute.interface';

export type ProductCalculatedAttributeCreate = Omit<
  ProductCalculatedAttribute,
  'id'
>;
