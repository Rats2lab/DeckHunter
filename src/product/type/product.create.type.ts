import { Product } from '../interface/product.interface';

export type ProductCreate = Omit<Product, 'id'>;
