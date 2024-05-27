import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';

@Injectable()
export class ProductFindAllService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
