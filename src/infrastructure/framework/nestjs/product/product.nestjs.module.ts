import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductMikroOrm } from '../../../persistence/mikro-orm/product/entity/product.mikro-orm.entity';
import { ProductRepository } from '../../../../domain/product/repository/product.repository';
import { ProductMikroOrmRepository } from '../../../persistence/mikro-orm/product/repository/product.mikro-orm.repository';

@Module({
  imports: [MikroOrmModule.forFeature([ProductMikroOrm])],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductMikroOrmRepository,
    },
  ],
})
export class ProductNestjsModule {}
