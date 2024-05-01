import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';

@Injectable()
export class ProductCreateService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(productCreate: ProductCreate): Promise<Product> {
    return this.productRepository.insertOne(productCreate);
  }
}
