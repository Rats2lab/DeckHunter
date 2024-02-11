import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/product/interface/product.interface';
import { ProductCreateService } from './product.create.service';
import { ProductRaw } from '../../domain/product/interface/product.raw.interface';

@Injectable()
export class ProductCreateFromJsonService {
  constructor(private readonly productCreateService: ProductCreateService) {}
  async create(rawProduct: ProductRaw): Promise<Product> {
    return this.productCreateService.create({
      author: {
        id: rawProduct.data.post.makers[0].id,
        nickname: rawProduct.data.post.makers[0].username,
        link: rawProduct.data.post.makers[0].avatarUrl,
      },
      title: rawProduct.data.post.product.name,
      description: rawProduct.data.post.product.description,
      launchDate: new Date(rawProduct.data.post.featuredAt),
      votes: rawProduct.data.post.votesCount,
      country: 'TBD', // TODO: Find alternative
    });
  }
}
