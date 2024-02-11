import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product/repository/product.repository';
import { Product } from '../../domain/product/interface/product.interface';
import { ProductCreate } from '../../domain/product/type/product.create.type';

@Injectable()
export class ProductCreateService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(productCreate: ProductCreate): Promise<Product> {
    return this.productRepository.insertOne(productCreate);
  }
}
