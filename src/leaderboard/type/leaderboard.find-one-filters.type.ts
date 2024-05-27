import { Leaderboard } from '../interface/leaderboard.interface';

export type LeaderboardFindOneFilters =
  | Pick<Leaderboard, 'id'>
  | Pick<Leaderboard, 'date'>;
