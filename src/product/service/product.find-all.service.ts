import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductFindAllService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
