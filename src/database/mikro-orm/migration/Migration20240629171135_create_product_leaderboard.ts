import { Migration } from '@mikro-orm/migrations';

export class Migration20240629171135_create_product_leaderboard extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "product_leaderboard" ("id" uuid not null, "product_id" uuid not null, "leaderboard_id" uuid not null, "created_at" timestamp not null, "updated_at" timestamp not null, constraint "product_leaderboard_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "product_leaderboard" add constraint "product_leaderboard_product_id_foreign" foreign key ("product_id") references "product" ("id") on update RESTRICT on delete RESTRICT;',
    );
    this.addSql(
      'alter table "product_leaderboard" add constraint "product_leaderboard_leaderboard_id_foreign" foreign key ("leaderboard_id") references "leaderboard" ("id") on update RESTRICT on delete RESTRICT;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "product_leaderboard" drop constraint "product_leaderboard_leaderboard_id_foreign";',
    );

    this.addSql(
      'alter table "product_leaderboard" drop constraint "product_leaderboard_product_id_foreign";',
    );

    this.addSql('drop table if exists "product_leaderboard" cascade;');
  }
}
