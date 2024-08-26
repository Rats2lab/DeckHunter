import { ProductAttribute } from '../interface/product-attribute.interface';

export type ProductAttributeCreate = Omit<ProductAttribute, 'id'>;
