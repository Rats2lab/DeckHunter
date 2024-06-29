import { Migration } from '@mikro-orm/migrations';

export class Migration20240629171130_create_product extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "product" ("id" uuid not null, "provider_external_id" varchar(50) not null, "title" varchar(100) not null, "description" varchar(500) not null, "launch_date" date not null, "votes" bigint not null, "provider_external_link" varchar(500) not null, "thumbnail" varchar(500) not null, "link" varchar(500) not null, "provider" text check ("provider" in (\'product_hunt\')) not null, "created_at" timestamp not null, "updated_at" timestamp not null, constraint "product_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "product_provider_external_id_provider_index" on "product" ("provider_external_id", "provider");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product" cascade;');
  }
}
