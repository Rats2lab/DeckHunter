import { Injectable } from '@nestjs/common';
import { LeaderboardRepository } from '../repository/leaderboard.repository';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreate } from '../type/leaderboard.create.type';

@Injectable()
export class LeaderboardCreateService {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async create(leaderboardCreate: LeaderboardCreate): Promise<Leaderboard> {
    return this.leaderboardRepository.insertOne(leaderboardCreate);
  }
}
