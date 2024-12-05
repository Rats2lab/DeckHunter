import { MikroORM } from '@mikro-orm/core';
import { InjectMikroORM, MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ProductNestjsModule } from '../product/product.nestjs.module';
import { LeaderboardNestjsModule } from '../leaderboard/leaderboard.nestjs.module';
import { ProductLeaderboardNestjsModule } from '../product-leaderboard/product-leaderboard.nestjs.module';
import mikroOrmConfig from '../mikro-orm.config';
import { ProductProviderNestjsModule } from '../product-provider/product-provider.nestjs.module';
import { ProductHuntNestjsModule } from '../product-hunt/product-hunt.nestjs.module';
import { GraphqlNestjsModule } from '../graphql/graphql.nestjs.module';
import { TelegramBotNestjsModule } from '../telegram-bot/telegram-bot.nestjs.module';
import { OpenAiNestjsModule } from '../open-ai/open-ai.nestjs.module';
import { AnthropicAiNestjsModule } from '../anthropic-ai/anthropic-ai.nestjs.module';
import { ProductAttributeNestjsModule } from '../product-attribute/product-attribute.nestjs.module';
import { OllamaNestjsModule } from '../ollama/ollama.nestjs.module';
import { DATABASE_CONTEXT_NAME } from '../database/constant/database.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      contextName: DATABASE_CONTEXT_NAME,
      useFactory: mikroOrmConfig,
    }),
    MikroOrmModule.forMiddleware(),
    LeaderboardNestjsModule,
    ProductNestjsModule,
    ProductLeaderboardNestjsModule,
    GraphqlNestjsModule,
    ProductHuntNestjsModule,
    ProductProviderNestjsModule,
    TelegramBotNestjsModule,
    OpenAiNestjsModule,
    AnthropicAiNestjsModule,
    ProductAttributeNestjsModule,
    OllamaNestjsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppNestjsModule implements OnModuleInit {
  constructor(
    @InjectMikroORM(DATABASE_CONTEXT_NAME) private readonly orm: MikroORM,
  ) {}

  async onModuleInit() {
    await this.orm.getMigrator().up();
  }
}
