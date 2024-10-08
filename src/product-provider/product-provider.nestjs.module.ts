import { Module } from '@nestjs/common';
import { ProductProviderFindProductsService } from './service/product-provider.find-products.service';
import { ProductHuntNestjsModule } from '../product-hunt/product-hunt.nestjs.module';
import { ProductProviderGetLeaderboardLinkService } from './service/product-provider.get-leaderboard-link.service';

@Module({
  imports: [ProductHuntNestjsModule],
  providers: [
    ProductProviderFindProductsService,
    ProductProviderGetLeaderboardLinkService,
  ],
  exports: [
    ProductProviderFindProductsService,
    ProductProviderGetLeaderboardLinkService,
  ],
})
export class ProductProviderNestjsModule {}
