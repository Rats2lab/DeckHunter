import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { LeaderboardFindFilters } from '../type/leaderboard.find-filters.type';

export class LeaderboardFindFiltersDto
  implements InfrastructureObject<LeaderboardFindFilters>
{
  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;

  toDomain(): LeaderboardFindFilters {
    return {
      offset: this.offset,
      limit: this.limit,
    };
  }
}
