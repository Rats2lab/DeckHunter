import { Migration } from '@mikro-orm/migrations';

export class Migration20240826090739_create_product_attribute extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "product_attribute" ("id" uuid not null, "product_id" uuid not null, "attribute_name" text check ("attribute_name" in (\'problem\', \'solution\', \'customers\', \'unique_features\', \'alternatives\', \'market_size\')) not null, "provider" text check ("provider" in (\'open_ai\', \'anthropic_ai\')) not null, "raw_output" varchar(1500) not null, "processed_output" varchar(500) not null, "created_at" timestamp not null, "updated_at" timestamp not null, constraint "product_attribute_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "product_attribute" add constraint "product_attribute_attribute_name_provider_unique" unique ("product_id", "attribute_name", "provider");',
    );

    this.addSql(
      'alter table "product_attribute" add constraint "product_attribute_product_id_foreign" foreign key ("product_id") references "product" ("id") on update RESTRICT on delete RESTRICT;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product_attribute" cascade;');
  }
}
