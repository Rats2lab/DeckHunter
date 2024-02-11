import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/product/interface/product.interface';
import { ProductRepository } from '../../domain/product/repository/product.repository';

@Injectable()
export class ProductFindAllService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
