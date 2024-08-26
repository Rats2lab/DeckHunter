import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { LeaderboardDto } from '../../leaderboard/dto/leaderboard.dto';
import { Product } from '../interface/product.interface';
import { ProductWithRelations } from '../interface/product.with-relations.interface';
import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';
import { ProductAttributeDto } from '../../product-attribute/dto/product-attribute.dto';

export class ProductDto implements InfrastructureObject<ProductWithRelations> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  providerExternalId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  providerExternalLink: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  tagline: string;

  @ApiProperty()
  launchDate: Date;

  @ApiProperty()
  votes: number;

  @ApiProperty({ type: LeaderboardDto, isArray: true })
  leaderboards: LeaderboardDto[];

  @ApiProperty({ type: ProductAttributeDto, isArray: true })
  attributes: ProductAttributeDto[];

  @ApiProperty({ enum: ProductProviderName })
  @Exclude()
  provider: ProductProviderName;

  constructor(product: Product) {
    Object.assign(this, product);
  }

  toDomain(): ProductWithRelations {
    return {
      id: this.id,
      providerExternalId: this.providerExternalId,
      providerExternalLink: this.providerExternalLink,
      link: this.link,
      thumbnail: this.thumbnail,
      tagline: this.tagline,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      provider: this.provider,
      leaderboards: this.leaderboards.map((leaderboard) =>
        leaderboard.toDomain(),
      ),
      attributes: this.attributes.map((attribute) => attribute.toDomain()),
    };
  }
}
