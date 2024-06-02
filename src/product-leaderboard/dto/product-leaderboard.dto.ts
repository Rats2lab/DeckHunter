import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';

export class ProductLeaderboardDto
  implements InfrastructureObject<ProductLeaderboard>
{
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  leaderboardId: string;

  constructor(product: ProductLeaderboard) {
    Object.assign(this, product);
  }

  toDomain(): ProductLeaderboard {
    return {
      id: this.id,
      productId: this.productId,
      leaderboardId: this.leaderboardId,
    };
  }
}
