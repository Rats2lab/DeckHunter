import { ProductAttribute } from '../interface/product-attribute.interface';

export type ProductCalculatedAttributeCreate = Omit<ProductAttribute, 'id'>;
