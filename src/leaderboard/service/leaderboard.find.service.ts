import { Injectable } from '@nestjs/common';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardFindFilters } from '../type/leaderboard.find-filters.type';
import { LeaderboardMikroOrmRepository } from '../repository/leaderboard.mikro-orm.repository';

@Injectable()
export class LeaderboardFindService {
  constructor(
    private readonly leaderboardRepository: LeaderboardMikroOrmRepository,
  ) {}

  async find(
    leaderboardFindFilters: LeaderboardFindFilters,
  ): Promise<Leaderboard[]> {
    if (leaderboardFindFilters.limit > 100) {
      leaderboardFindFilters.limit = 100;
    }

    return this.leaderboardRepository.find(leaderboardFindFilters);
  }
}
