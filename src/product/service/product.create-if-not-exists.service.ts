import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductCreateService } from './product.create.service';
import { ProductFindOneService } from './product.find-one.service';

@Injectable()
export class ProductCreateIfNotExistsService {
  constructor(
    private readonly productCreateService: ProductCreateService,
    private readonly productFindOneService: ProductFindOneService,
  ) {}

  async createIfNotExists(productCreate: ProductCreate): Promise<Product> {
    const existingProduct: Product | undefined =
      await this.productFindOneService.findOne({
        providerExternalId: productCreate.providerExternalId,
        provider: productCreate.provider,
      });

    if (existingProduct) {
      return existingProduct;
    }

    return this.productCreateService.create(productCreate);
  }
}
