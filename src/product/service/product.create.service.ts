import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';

@Injectable()
export class ProductCreateService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async create(productCreate: ProductCreate): Promise<Product> {
    return this.productRepository.insert(productCreate);
  }
}
