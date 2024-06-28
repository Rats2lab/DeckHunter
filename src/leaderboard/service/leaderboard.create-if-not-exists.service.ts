import { Injectable } from '@nestjs/common';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreateIfNotExistsFilters } from '../type/leaderboard.create-if-not-exists.type';
import { LeaderboardCreateService } from './leaderboard.create.service';
import { LeaderboardFindOneService } from './leaderboard.find-one.service';

@Injectable()
export class LeaderboardCreateIfNotExistsService {
  constructor(
    private readonly leaderboardFindOneService: LeaderboardFindOneService,
    private readonly leaderboardCreateService: LeaderboardCreateService,
  ) {}

  async createIfNotExists(
    createIfNotExistsFilters: LeaderboardCreateIfNotExistsFilters,
  ): Promise<Leaderboard> {
    const existingLeaderboard: Leaderboard | undefined =
      await this.leaderboardFindOneService.findOne({
        date: createIfNotExistsFilters.date,
      });

    if (existingLeaderboard) {
      return existingLeaderboard;
    }

    return this.leaderboardCreateService.create({
      date: createIfNotExistsFilters.date,
      link: createIfNotExistsFilters.link,
    });
  }
}
