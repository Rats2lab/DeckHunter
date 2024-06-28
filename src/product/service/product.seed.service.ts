import { Injectable } from '@nestjs/common';

import { Leaderboard } from '../../leaderboard/interface/leaderboard.interface';
import { LeaderboardCreateIfNotExistsService } from '../../leaderboard/service/leaderboard.create-if-not-exists.service';
import { ProductProviderFindProductsService } from '../../product-provider/service/product-provider.find-products.service';
import { ProductProviderGetLeaderboardLinkService } from '../../product-provider/service/product-provider.get-leaderboard-link.service';
import { ProductSeedParams } from '../interface/product.seed-params.interface';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductCreateManyService } from './product.create-many.service';
import { ProductFindAllService } from './product.find-all.service';
import { DateTime } from 'luxon';

@Injectable()
export class ProductSeedService {
  constructor(
    private readonly productProviderGetProductsService: ProductProviderFindProductsService,
    private readonly leaderboardCreateIfNotExistsService: LeaderboardCreateIfNotExistsService,
    private readonly productProviderGetLeaderboardLinkService: ProductProviderGetLeaderboardLinkService,
    private readonly productCreateManyService: ProductCreateManyService,
    private readonly productFindAllService: ProductFindAllService,
  ) {}

  async seed(
    productSeedParams: ProductSeedParams,
  ): Promise<ProductWithLeaderboards[]> {
    // TODO: Store generic leaderboards and provider leaderboards

    const leaderboardLink: string =
      await this.productProviderGetLeaderboardLinkService.getLeaderboardLink({
        provider: productSeedParams.provider,
        date: DateTime.fromJSDate(productSeedParams.leaderboardDate),
      });

    const leaderboard: Leaderboard =
      await this.leaderboardCreateIfNotExistsService.createIfNotExists({
        date: DateTime.fromJSDate(productSeedParams.leaderboardDate)
          .startOf('day')
          .toJSDate(),
        link: leaderboardLink,
      });

    const foundProductsOnProvider: ProductCreate[] =
      await this.productProviderGetProductsService.findProducts({
        provider: productSeedParams.provider,
        date: DateTime.fromJSDate(productSeedParams.leaderboardDate),
      });

    await this.productCreateManyService.createMany(foundProductsOnProvider);

    return this.productFindAllService.findAll({
      leaderboardId: leaderboard.id,
      offset: 0,
      limit: 100,
    });
  }
}
