import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductMikroOrmRepository } from './repository/product.mikro-orm.repository';
import { ProductCreateFromJsonService } from './service/product.create-from-json.service';
import { ProductCreateService } from './service/product.create.service';
import { ProductHttpController } from './controller/product.http.controller';
import { ProductFindOneService } from './service/product.find-one.service';
import { ProductFindAllService } from './service/product.find-all.service';
import { ProductMikroOrm } from './entity/product.mikro-orm.entity';
import { ProductMockedHttpController } from './controller/product.mocked-http.controller';

@Module({
  imports: [MikroOrmModule.forFeature([ProductMikroOrm])],
  controllers: [ProductHttpController, ProductMockedHttpController],
  providers: [
    ProductCreateFromJsonService,
    ProductCreateService,
    ProductFindOneService,
    ProductFindAllService,
    ProductMikroOrmRepository,
  ],
})
export class ProductNestjsModule {}
