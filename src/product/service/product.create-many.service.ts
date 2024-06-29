import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductCreateIfNotExistsService } from './product.create-if-not-exists.service';

@Injectable()
export class ProductCreateManyService {
  constructor(
    private readonly productCreateIfNotExistsService: ProductCreateIfNotExistsService,
  ) {}

  async createMany(productsCreate: ProductCreate[]): Promise<Product[]> {
    const createdProducts: Product[] = [];

    for (let productCreate of productsCreate) {
      const createdProduct: Product =
        await this.productCreateIfNotExistsService.createIfNotExists(
          productCreate,
        );

      createdProducts.push(createdProduct);
    }

    return createdProducts;
  }
}
