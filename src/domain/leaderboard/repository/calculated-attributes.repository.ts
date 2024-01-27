import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreate } from '../type/leaderboard.create.type';

export abstract class LeaderboardRepository {
  abstract insertOne(
    leaderboardCreate: LeaderboardCreate,
  ): Promise<Leaderboard>;
}
