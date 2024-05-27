import { Injectable } from '@nestjs/common';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreate } from '../type/leaderboard.create.type';
import { LeaderboardMikroOrmRepository } from '../repository/leaderboard.mikro-orm.repository';

@Injectable()
export class LeaderboardCreateService {
  constructor(
    private readonly leaderboardRepository: LeaderboardMikroOrmRepository,
  ) {}

  async create(leaderboardCreate: LeaderboardCreate): Promise<Leaderboard> {
    return this.leaderboardRepository.insert(leaderboardCreate);
  }
}
