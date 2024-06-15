import { Injectable } from '@nestjs/common';
import { ProductHuntProduct } from '../interface/product-hunt.product.interface';
import { ProductHuntProductRepository } from '../repository/product-hunt.product.repository';

@Injectable()
export class ProductHuntFindProductService {
  constructor(
    private readonly productHuntProductRepository: ProductHuntProductRepository,
  ) {}
  async findProduct(): Promise<ProductHuntProduct[]> {
    return this.productHuntProductRepository.find();
  }
}
