import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';
import { ProductCreate } from '../../product/type/product.create.type';
import { ProductHuntProduct } from '../interface/product-hunt.product.interface';

export class ProductHuntProductDto
  implements InfrastructureObject<ProductHuntProduct>
{
  id: string;
  name: string;
  tagline: string;
  description: string;
  website: string;
  url: string;
  thumbnail: { url: string };
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
      providerExternalLink: this.url,
      tagline: this.tagline,
      link: this.website,
      thumbnail: this.thumbnail.url,
      title: this.name,
      description: this.description,
      launchDate: new Date(this.featuredAt),
      votes: this.votesCount,
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
      thumbnail: this.thumbnail,
      votesCount: this.votesCount,
      reviewsCount: this.reviewsCount,
      reviewsRating: this.reviewsRating,
      featuredAt: this.featuredAt,
      createdAt: this.createdAt,
      toProduct: this.toProduct,
    };
  }
}
