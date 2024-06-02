import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreate } from '../type/leaderboard.create.type';

export class LeaderboardCreateDto
  implements InfrastructureObject<LeaderboardCreate>
{
  @ApiProperty()
  date: Date;

  @ApiProperty()
  link: string;

  constructor(leaderboard: Leaderboard) {
    Object.assign(this, leaderboard);
  }

  toDomain(): LeaderboardCreate {
    return {
      date: this.date,
      link: this.link,
    };
  }
}
