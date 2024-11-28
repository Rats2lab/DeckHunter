import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

export const mikroOrmConfig = async (): Promise<MikroOrmModuleSyncOptions> => ({
  type: 'postgresql',
  host: process.env.DH_DB_HOST,
  port: +process.env.DH_DB_PORT,
  user: process.env.DH_DB_USER,
  password: process.env.DH_DB_PASS,
  dbName: process.env.DH_DB_NAME,
  entities: [`${process.cwd()}/dist/src/**/*entity.{js,ts}`],
  forceUtcTimezone: true,
  migrations: {
    tableName: 'mikro-orm-migrations',
    path: 'dist/src/database/mikro-orm/migration',
    snapshot: false,
    transactional: true,
    disableForeignKeys: false,
  },
  discovery: {
    warnWhenNoEntities: true,
  },
  ...(process.env.DH_DB_SSL === 'true' && {
    driverOptions: {
      connection: { ssl: process.env.DH_DB_SSL },
    },
  }),
});

export default mikroOrmConfig;
