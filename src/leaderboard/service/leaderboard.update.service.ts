import { Injectable } from '@nestjs/common';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardMikroOrmRepository } from '../repository/leaderboard.mikro-orm.repository';
import { LeaderboardUpdateFields } from '../type/leaderboard.update-fields.type';
import { LeaderboardUpdateFilters } from '../type/leaderboard.update-filters.type';

@Injectable()
export class LeaderboardUpdateService {
  constructor(
    private readonly leaderboardRepository: LeaderboardMikroOrmRepository,
  ) {}

  async update(
    leaderboardUpdateFilters: LeaderboardUpdateFilters,
    leaderboardUpdateFields: LeaderboardUpdateFields,
  ): Promise<Leaderboard> {
    return this.leaderboardRepository.update(
      leaderboardUpdateFilters,
      leaderboardUpdateFields,
    );
  }
}
