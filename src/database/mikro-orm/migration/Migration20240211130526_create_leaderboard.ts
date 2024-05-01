import { Migration } from '@mikro-orm/migrations';

export class Migration20240211130526_create_leaderboard extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "leaderboard" (
        "id" uuid not null,
        "date" date not null,
        "link" varchar(255) not null,
        "created_at" timestamp not null,
        "updated_at" timestamp not null,
        constraint "leaderboard_pkey" primary key ("id"));`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "leaderboard" cascade;');
  }
}
