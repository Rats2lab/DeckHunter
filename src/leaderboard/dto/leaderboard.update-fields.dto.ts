import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure-object.type';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardUpdateFields } from '../type/leaderboard.update-fields.type';

export class LeaderboardUpdateFieldsDto
  implements InfrastructureObject<LeaderboardUpdateFields>
{
  @ApiProperty()
  link: string;

  constructor(leaderboard: Leaderboard) {
    Object.assign(this, leaderboard);
  }

  toDomain(): LeaderboardUpdateFields {
    return {
      link: this.link,
    };
  }
}
