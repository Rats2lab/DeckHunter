import { Injectable } from '@nestjs/common';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardFindOneFilters } from '../type/leaderboard.find-one-filters.type';
import { LeaderboardMikroOrmRepository } from '../repository/leaderboard.mikro-orm.repository';

@Injectable()
export class LeaderboardFindOneService {
  constructor(
    private readonly leaderboardRepository: LeaderboardMikroOrmRepository,
  ) {}

  async findOne(
    leaderboardFindOneFilters: LeaderboardFindOneFilters,
  ): Promise<Leaderboard> {
    return this.leaderboardRepository.findOne(leaderboardFindOneFilters);
  }
}
