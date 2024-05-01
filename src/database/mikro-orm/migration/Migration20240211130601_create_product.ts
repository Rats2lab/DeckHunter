import { Migration } from '@mikro-orm/migrations';

export class Migration20240211130601_create_product extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "product" (
        "id" uuid not null,
        "author" jsonb not null,
        "title" varchar(100) not null,
        "description" varchar(500) not null,
        "launch_date" date not null,
        "votes" bigint not null,
        "country" varchar(3) not null,
        "created_at" timestamp not null,
        "updated_at" timestamp not null,
        constraint "product_pkey" primary key ("id"));`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product" cascade;');
  }
}
