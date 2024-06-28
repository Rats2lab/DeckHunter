import { Injectable } from '@nestjs/common';
import { ProductHuntProduct } from '../interface/product-hunt.product.interface';
import { ProductHuntProductRepository } from '../repository/product-hunt.product.repository';
import { ProductHuntFindProductsFilters } from '../interface/product-hunt.find-products-filters.interface';

@Injectable()
export class ProductHuntFindProductService {
  constructor(
    private readonly productHuntProductRepository: ProductHuntProductRepository,
  ) {}
  async findProduct(
    findProductsFilters: ProductHuntFindProductsFilters,
  ): Promise<ProductHuntProduct[]> {
    return this.productHuntProductRepository.find({
      postedAfter: findProductsFilters.dateFrom.startOf('day').toISODate(),
      postedBefore: findProductsFilters.dateTo.startOf('day').toISODate(),
      order: findProductsFilters.order,
      featured: String(findProductsFilters.featured),
    });
  }
}
