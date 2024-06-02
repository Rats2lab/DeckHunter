import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductFindFilters } from '../type/product.find-filters.type';

export class ProductFindFiltersDto
  implements InfrastructureObject<ProductFindFilters>
{
  @ApiProperty()
  leaderboardId: string;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;

  toDomain(): ProductFindFilters {
    return {
      leaderboardId: this.leaderboardId,
      offset: this.offset,
      limit: this.limit,
    };
  }
}
