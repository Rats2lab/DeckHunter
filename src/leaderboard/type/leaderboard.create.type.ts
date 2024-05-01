import { Leaderboard } from '../interface/leaderboard.interface';

export type LeaderboardCreate = Omit<Leaderboard, 'id'>;
