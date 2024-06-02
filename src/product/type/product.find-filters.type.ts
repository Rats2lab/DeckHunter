import { PaginableFilter } from '../../common/paginable.filter.interface';

export type ProductFindFilters = PaginableFilter & {
  leaderboardId: string;
};
