import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AnthropicAiNestjsModule } from '../anthropic-ai/anthropic-ai.nestjs.module';
import { ProductAttributeMikroOrm } from './entity/product-attribute.mikro-orm.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([ProductAttributeMikroOrm]),
    AnthropicAiNestjsModule,
  ],
  providers: [],
  exports: [],
})
export class ProductAttributeNestjsModule {}
