import { Injectable } from '@nestjs/common';
import { ProductHuntFindProductService } from '../../product-hunt/service/product-hunt.find-product.service';
import { ProductTransformableObject } from '../../product/interface/product.transformable-object.type';
import { ProductCreate } from '../../product/type/product.create.type';
import { ProductProviderName } from '../enum/product-provider.name.enum';
import { ProductProviderFindProductFilters } from '../interfaces/product-provider.find-products-filters.interface';
import { ProductHuntProductOrder } from '../../product-hunt/enum/product-hunt.product-order.enum';
import { DateTime } from 'luxon';

@Injectable()
export class ProductProviderFindProductsService {
  constructor(
    private readonly productHuntFindProductService: ProductHuntFindProductService,
  ) {}

  async findProducts(
    findFilters: ProductProviderFindProductFilters,
  ): Promise<ProductCreate[]> {
    switch (findFilters.provider) {
      case ProductProviderName.PRODUCT_HUNT:
        const providerProducts: ProductTransformableObject[] =
          await this.productHuntFindProductService.findProduct({
            dateFrom: findFilters.date,
            dateTo: findFilters.date.plus({ days: 1 }),
            order: ProductHuntProductOrder.RANKING,
            featured: true,
          });

        return providerProducts.map((product) => product.toProduct());
      default:
        const unknownProvider: never = findFilters.provider;
        throw new Error(`Unknown product provider ${unknownProvider}`);
    }
  }
}
