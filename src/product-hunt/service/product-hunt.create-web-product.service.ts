import { Injectable } from '@nestjs/common';
import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';
import { Product } from '../../product/interface/product.interface';
import { ProductCreateService } from '../../product/service/product.create.service';
import { ProductHuntWebProduct } from '../interface/product-hunt.web-product.interface';

@Injectable()
export class ProductHuntCreateWebProductService {
  constructor(private readonly productCreateService: ProductCreateService) {}
  async createProduct(webProduct: ProductHuntWebProduct): Promise<Product> {
    return this.productCreateService.create({
      author: {
        id: webProduct.data.post.makers[0].id,
        nickname: webProduct.data.post.makers[0].username,
        link: webProduct.data.post.makers[0].avatarUrl,
      },
      title: webProduct.data.post.product.name,
      description: webProduct.data.post.product.description,
      launchDate: new Date(webProduct.data.post.featuredAt),
      votes: webProduct.data.post.votesCount,
      country: 'TBD', // TODO: Find alternative
      provider: ProductProviderName.PRODUCT_HUNT,
    });
  }
}
