import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ProductNestjsModule } from '../product/product.nestjs.module';
import { LeaderboardNestjsModule } from '../leaderboard/leaderboard.nestjs.module';
import { ProductLeaderboardNestjsModule } from '../product-leaderboard/product-leaderboard.nestjs.module';
import mikroOrmConfig from '../mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useFactory: mikroOrmConfig,
    }),
    /*MikroOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      user: 'back_app',
      password: '3k1Kfl@v7',
      dbName: 'hunters_labs_db',*/
    //entities: [`${process.cwd()}/dist/src/**/*entity.{js,ts}`],
    /*forceUtcTimezone: true,
      migrations: {
        tableName: 'mikro-orm-migrations',
        path: 'dist/src/database/mikro-orm/migration',
        snapshot: false,
        transactional: true,
      },
      discovery: {
        warnWhenNoEntities: true,
      },
    }),*/
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
