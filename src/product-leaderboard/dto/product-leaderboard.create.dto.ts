import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure-object.type';
import { ProductLeaderboardCreate } from '../type/product-leaderboard.create.type';

export class ProductLeaderboardCreateDto
  implements InfrastructureObject<ProductLeaderboardCreate>
{
  @ApiProperty()
  productId: string;

  @ApiProperty()
  leaderboardId: string;

  constructor(productLeaderboard: ProductLeaderboardCreate) {
    Object.assign(this, productLeaderboard);
  }

  toDomain(): ProductLeaderboardCreate {
    return {
      productId: this.productId,
      leaderboardId: this.leaderboardId,
    };
  }
}
