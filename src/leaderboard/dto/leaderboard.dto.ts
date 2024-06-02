import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { Leaderboard } from '../interface/leaderboard.interface';

export class LeaderboardDto implements InfrastructureObject<Leaderboard> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  link: string;

  constructor(leaderboard: Leaderboard) {
    Object.assign(this, leaderboard);
  }

  toDomain(): Leaderboard {
    return {
      id: this.id,
      date: this.date,
      link: this.link,
    };
  }
}
