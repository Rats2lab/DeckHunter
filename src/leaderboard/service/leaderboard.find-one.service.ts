import { Injectable } from '@nestjs/common';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardMikroOrmRepository } from '../repository/leaderboard.mikro-orm.repository';
import { LeaderboardFindOneFilters } from '../type/leaderboard.find-one-filters.type';

@Injectable()
export class LeaderboardFindOneService {
  constructor(
    private readonly leaderboardRepository: LeaderboardMikroOrmRepository,
  ) {}

  async findOne(
    leaderboardFindOneFilters: LeaderboardFindOneFilters,
  ): Promise<Leaderboard | undefined> {
    return this.leaderboardRepository.findOne(leaderboardFindOneFilters);
  }
}
