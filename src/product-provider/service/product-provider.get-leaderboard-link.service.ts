import { Injectable } from '@nestjs/common';
import { ProductProviderName } from '../enum/product-provider.name.enum';
import { ProductProviderGetLeaderboardLinkParams } from '../interfaces/product-provider.get-leaderboard-link-params.interface';

@Injectable()
export class ProductProviderGetLeaderboardLinkService {
  async getLeaderboardLink(
    getLeaderboardLinkParams: ProductProviderGetLeaderboardLinkParams,
  ): Promise<string> {
    switch (getLeaderboardLinkParams.provider) {
      case ProductProviderName.PRODUCT_HUNT:
        return (
          'https://www.producthunt.com/leaderboard/daily/' +
          `${getLeaderboardLinkParams.date.year}/${getLeaderboardLinkParams.date.month}/${getLeaderboardLinkParams.date.day}`
        );
      default:
        const unknownProvider: never = getLeaderboardLinkParams.provider;
        throw new Error(`Unknown product provider ${unknownProvider}`);
    }
  }
}
