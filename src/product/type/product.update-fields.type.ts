import { Product } from '../interface/product.interface';

export type ProductUpdateFields = Pick<Product, 'votes'>;
