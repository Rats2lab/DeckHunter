import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import mikroOrmConfig from '../../../persistence/mikro-orm/mikro-orm.config';
import { ProductNestjsModule } from '../product/product.nestjs.module';
import { LeaderboardNestjsModule } from '../leaderboard/leaderboard.nestjs.module';
import { ProductLeaderboardNestjsModule } from '../product-leaderboard/product-leaderboard.nestjs.module';

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
