import { Leaderboard } from '../interface/leaderboard.interface';

export type LeaderboardFindOneFilters =
  | (Pick<Leaderboard, 'id'> & Pick<Partial<Leaderboard>, 'date'>)
  | (Pick<Partial<Leaderboard>, 'id'> & Pick<Leaderboard, 'date'>);
