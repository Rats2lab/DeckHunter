import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import { Leaderboard } from '../../leaderboard/interface/leaderboard.interface';
import { LeaderboardCreateIfNotExistsService } from '../../leaderboard/service/leaderboard.create-if-not-exists.service';
import { ProductLeaderboardCreateManyService } from '../../product-leaderboard/service/product-leaderboard.create-many.service';
import { ProductProviderFindProductsService } from '../../product-provider/service/product-provider.find-products.service';
import { ProductProviderGetLeaderboardLinkService } from '../../product-provider/service/product-provider.get-leaderboard-link.service';
import { TelegramBotSendAllNewProductsService } from '../../telegram-bot/service/telegram-bot.send-all-new-products.service';
import { Product } from '../interface/product.interface';
import { ProductSeedParams } from '../interface/product.seed-params.interface';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductCreateManyService } from './product.create-many.service';
import { ProductFindAllService } from './product.find-all.service';

@Injectable()
export class ProductSeedService {
  constructor(
    private readonly configService: ConfigService,
    private readonly productProviderGetProductsService: ProductProviderFindProductsService,
    private readonly leaderboardCreateIfNotExistsService: LeaderboardCreateIfNotExistsService,
    private readonly productProviderGetLeaderboardLinkService: ProductProviderGetLeaderboardLinkService,
    private readonly productCreateManyService: ProductCreateManyService,
    private readonly productFindAllService: ProductFindAllService,
    private readonly productLeaderboardCreateManyService: ProductLeaderboardCreateManyService,
    private readonly telegramBotSendAllNewProductsService: TelegramBotSendAllNewProductsService,
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

    const createdProducts: Product[] =
      await this.productCreateManyService.createMany(foundProductsOnProvider);

    await this.telegramBotSendAllNewProductsService.sendAllNewProducts(
      {
        chatId: this.configService.getOrThrow<number>('TELEGRAM_BOT_CHAT_ID'),
        botToken: this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'),
      },
      createdProducts,
      productSeedParams.leaderboardDate,
    );

    await this.productLeaderboardCreateManyService.createMany(
      createdProducts.map((product) => {
        return {
          productId: product.id,
          leaderboardId: leaderboard.id,
        };
      }),
    );

    return this.productFindAllService.findAll({
      leaderboardId: leaderboard.id,
      offset: 0,
      limit: 1000,
    });
  }
}
