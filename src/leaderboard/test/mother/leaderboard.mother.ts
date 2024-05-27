import { UtilsMother } from '../../../../test/mother/utils.mother';
import { Leaderboard } from '../../interface/leaderboard.interface';

export class LeaderboardMother {
  getRandomLeaderboard(): Leaderboard {
    return {
      id: UtilsMother.getRandomUuid(),
      date: UtilsMother.getRandomDate(),
      link: UtilsMother.getRandomString(300),
    };
  }
}
