import { Injectable } from '@nestjs/common';
import { LeaderboardRepository } from '../../domain/leaderboard/repository/leaderboard.repository';
import { Leaderboard } from '../../domain/leaderboard/interface/leaderboard.interface';
import { LeaderboardCreate } from '../../domain/leaderboard/type/leaderboard.create.type';

@Injectable()
export class LeaderboardCreateService {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async create(leaderboardCreate: LeaderboardCreate): Promise<Leaderboard> {
    return this.leaderboardRepository.insertOne(leaderboardCreate);
  }
}
