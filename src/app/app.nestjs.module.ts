import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AnthropicAiNestjsModule } from '../anthropic-ai/anthropic-ai.nestjs.module';
import { GraphqlNestjsModule } from '../graphql/graphql.nestjs.module';
import { LeaderboardNestjsModule } from '../leaderboard/leaderboard.nestjs.module';
import mikroOrmConfig from '../mikro-orm.config';
import { OllamaNestjsModule } from '../ollama/ollama.nestjs.module';
import { OpenAiNestjsModule } from '../open-ai/open-ai.nestjs.module';
import { ProductAttributeNestjsModule } from '../product-attribute/product-attribute.nestjs.module';
import { ProductHuntNestjsModule } from '../product-hunt/product-hunt.nestjs.module';
import { ProductLeaderboardNestjsModule } from '../product-leaderboard/product-leaderboard.nestjs.module';
import { ProductProviderNestjsModule } from '../product-provider/product-provider.nestjs.module';
import { ProductNestjsModule } from '../product/product.nestjs.module';
import { TelegramBotNestjsModule } from '../telegram-bot/telegram-bot.nestjs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useFactory: mikroOrmConfig,
    }),
    LeaderboardNestjsModule,
    ProductNestjsModule,
    ProductLeaderboardNestjsModule,
    GraphqlNestjsModule,
    ProductHuntNestjsModule,
    ProductProviderNestjsModule,
    TelegramBotNestjsModule,
    OpenAiNestjsModule.register(),
    AnthropicAiNestjsModule.register(),
    ProductAttributeNestjsModule,
    OllamaNestjsModule.register(),
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
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    await this.orm.getMigrator().up();
  }
}
