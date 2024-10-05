import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { LeaderboardCreate } from '../type/leaderboard.create.type';

export class LeaderboardCreateDto
  implements InfrastructureObject<LeaderboardCreate>
{
  @ApiProperty()
  date: Date;

  @ApiProperty()
  link: string;

  constructor(leaderboard: LeaderboardCreate) {
    Object.assign(this, leaderboard);
  }

  toDomain(): LeaderboardCreate {
    return {
      date: this.date,
      link: this.link,
    };
  }
}
