import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AnthropicAiNestjsModule } from '../anthropic-ai/anthropic-ai.nestjs.module';
import { ProductAttributeMikroOrm } from './entity/product-attribute.mikro-orm.entity';
import { ProductAttributeMikroOrmRepository } from './repository/product-attribute.mikro-orm.repository';
import { ProductAttributeCalculateAndCreateManyService } from './service/product-attribute.calculate-and-create-many.service';
import { ProductAttributeCountService } from './service/product-attribute.count.service';
import { ProductAttributeCreateManyService } from './service/product-attribute.create-many.service';
import { ProductAttributeCreateService } from './service/product-attribute.create.service';
import { ProductAttributeCreateManyPromptsToCreateAttributesService } from './service/product-attribute.create-many-prompts-to-create-attributes.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([ProductAttributeMikroOrm]),
    AnthropicAiNestjsModule,
  ],
  providers: [
    ProductAttributeMikroOrmRepository,
    ProductAttributeCountService,
    ProductAttributeCreateService,
    ProductAttributeCalculateAndCreateManyService,
    ProductAttributeCreateManyService,
    ProductAttributeCreateManyPromptsToCreateAttributesService,
  ],
  exports: [
    ProductAttributeCountService,
    ProductAttributeCalculateAndCreateManyService,
  ],
})
export class ProductAttributeNestjsModule {}
