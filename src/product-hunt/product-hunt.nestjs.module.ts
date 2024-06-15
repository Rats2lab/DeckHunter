import { Module, forwardRef } from '@nestjs/common';
import { ProductHuntProductHttpController } from './controller/product-hunt.product.http.controller';
import { ProductHuntCreateWebProductService } from './service/product-hunt.create-web-product.service';
import { ProductNestjsModule } from '../product/product.nestjs.module';
import { GraphqlNestjsModule } from '../graphql/graphql.nestjs.module';
import { ProductHuntFindProductService } from './service/product-hunt.find-product.service';
import { ProductHuntProductRepository } from './repository/product-hunt.product.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 0,
    }),
    GraphqlNestjsModule,
    forwardRef(() => ProductNestjsModule),
  ],
  controllers: [ProductHuntProductHttpController],
  providers: [
    ProductHuntCreateWebProductService,
    ProductHuntFindProductService,
    ProductHuntProductRepository,
  ],
  exports: [ProductHuntCreateWebProductService],
})
export class ProductHuntNestjsModule {}
