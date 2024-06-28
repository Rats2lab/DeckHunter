import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductCreateService } from './product.create.service';

@Injectable()
export class ProductCreateManyService {
  constructor(private readonly productCreateService: ProductCreateService) {}

  async createMany(productsCreate: ProductCreate[]): Promise<Product[]> {
    const createdProducts: Product[] = [];

    for (let productCreate of productsCreate) {
      const createdProduct: Product = await this.productCreateService.create(
        productCreate,
      );

      createdProducts.push(createdProduct);
    }

    return createdProducts;
  }
}
