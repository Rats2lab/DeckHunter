import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { LeaderboardDto } from '../../leaderboard/dto/leaderboard.dto';
import { ProductAuthor } from '../interface/product-author.interface';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { Product } from '../interface/product.interface';

export class ProductDto
  implements InfrastructureObject<ProductWithLeaderboards>
{
  @ApiProperty()
  id: string;

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

  constructor(product: Product) {
    Object.assign(this, product);
  }

  toDomain(): ProductWithLeaderboards {
    return {
      id: this.id,
      author: this.author,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      country: this.country,
      leaderboards: this.leaderboards,
    };
  }
}
