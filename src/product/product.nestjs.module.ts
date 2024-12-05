import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME } from '../database/constant/database.constant';
import { LeaderboardNestjsModule } from '../leaderboard/leaderboard.nestjs.module';
import { ProductAttributeNestjsModule } from '../product-attribute/product-attribute.nestjs.module';
import { ProductLeaderboardNestjsModule } from '../product-leaderboard/product-leaderboard.nestjs.module';
import { ProductProviderNestjsModule } from '../product-provider/product-provider.nestjs.module';
import { TelegramBotNestjsModule } from '../telegram-bot/telegram-bot.nestjs.module';
import { ProductHttpController } from './controller/product.http.controller';
import { ProductMikroOrm } from './entity/product.mikro-orm.entity';
import { ProductMikroOrmRepository } from './repository/product.mikro-orm.repository';
import { ProductCreateIfNotExistsService } from './service/product.create-if-not-exists.service';
import { ProductCreateManyService } from './service/product.create-many.service';
import { ProductCreateService } from './service/product.create.service';
import { ProductFindAllService } from './service/product.find-all.service';
import { ProductFindOneService } from './service/product.find-one.service';
import { ProductSeedService } from './service/product.seed.service';
import { ProductUpdateService } from './service/product.update.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([ProductMikroOrm], DATABASE_CONTEXT_NAME),
    ProductProviderNestjsModule,
    LeaderboardNestjsModule,
    ProductLeaderboardNestjsModule,
    TelegramBotNestjsModule,
    ProductAttributeNestjsModule,
  ],
  controllers: [ProductHttpController],
  providers: [
    ProductCreateService,
    ProductFindOneService,
    ProductFindAllService,
    ProductUpdateService,
    ProductMikroOrmRepository,
    ProductCreateManyService,
    ProductSeedService,
    ProductCreateIfNotExistsService,
  ],
  exports: [ProductCreateService],
})
export class ProductNestjsModule {}
