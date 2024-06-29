import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { LeaderboardDto } from '../../leaderboard/dto/leaderboard.dto';
import { Product } from '../interface/product.interface';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';

export class ProductDto
  implements InfrastructureObject<ProductWithLeaderboards>
{
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

  @ApiProperty({ enum: ProductProviderName })
  @Exclude()
  provider: ProductProviderName;

  constructor(product: Product) {
    Object.assign(this, product);
  }

  toDomain(): ProductWithLeaderboards {
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
    };
  }
}
