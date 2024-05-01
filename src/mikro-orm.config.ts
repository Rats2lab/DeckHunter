import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

export const mikroOrmConfig = async (): Promise<MikroOrmModuleSyncOptions> => ({
  type: 'postgresql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  entities: [`${process.cwd()}/dist/src/**/*entity.{js,ts}`],
  forceUtcTimezone: true,
  migrations: {
    tableName: 'mikro-orm-migrations',
    path: 'dist/src/database/mikro-orm/migration',
    snapshot: false,
    transactional: true,
  },
  discovery: {
    warnWhenNoEntities: true,
  },
});

export default mikroOrmConfig;
