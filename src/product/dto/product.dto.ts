import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { LeaderboardDto } from '../../leaderboard/dto/leaderboard.dto';
import { ProductAuthor } from '../interface/product-author.interface';
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

  @ApiProperty({ type: ProductAuthor })
  author: ProductAuthor;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  launchDate: Date;

  @ApiProperty()
  votes: number;

  @ApiProperty()
  country: string;

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
      author: this.author,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      country: this.country,
      provider: this.provider,
      leaderboards: this.leaderboards.map((leaderboard) =>
        leaderboard.toDomain(),
      ),
    };
  }
}
