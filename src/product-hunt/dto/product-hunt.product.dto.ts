import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductHuntProduct } from '../interface/product-hunt.product.interface';
import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';
import { ProductCreate } from '../../product/type/product.create.type';

export class ProductHuntProductDto
  implements InfrastructureObject<ProductHuntProduct>
{
  id: string;
  name: string;
  tagline: string;
  description: string;
  website: string;
  url: string;
  userId: string;
  votesCount: number;
  reviewsCount: number;
  reviewsRating: number;
  featuredAt: string;
  createdAt: string;

  constructor(product: ProductHuntProduct) {
    Object.assign(this, product);
  }

  toProduct(): ProductCreate {
    return {
      providerExternalId: this.id,
      author: {
        id: this.userId,
      },
      title: this.name,
      description: this.description,
      launchDate: new Date(this.featuredAt),
      votes: this.votesCount,
      country: 'TBD', // TODO: Find alternative
      provider: ProductProviderName.PRODUCT_HUNT,
    };
  }

  toDomain(): ProductHuntProduct {
    return {
      id: this.id,
      name: this.name,
      tagline: this.tagline,
      description: this.description,
      website: this.website,
      url: this.url,
      userId: this.userId,
      votesCount: this.votesCount,
      reviewsCount: this.reviewsCount,
      reviewsRating: this.reviewsRating,
      featuredAt: this.featuredAt,
      createdAt: this.createdAt,
      toProduct: this.toProduct,
    };
  }
}
