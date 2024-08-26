import { Migration } from '@mikro-orm/migrations';

export class Migration20240826115654_alter_product_attribute extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "product_attribute" drop constraint "product_attribute_attribute_name_provider_unique";',
    );
    this.addSql('alter table "product_attribute" drop column "raw_output";');
    this.addSql(
      'alter table "product_attribute" add constraint "product_attribute_product_id_attribute_name_provider_unique" unique ("product_id", "attribute_name", "provider");',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "product_attribute" add column "raw_output" varchar(1500) not null default null;',
    );
    this.addSql(
      'alter table "product_attribute" drop constraint "product_attribute_product_id_attribute_name_provider_unique";',
    );
    this.addSql(
      'alter table "product_attribute" add constraint "product_attribute_attribute_name_provider_unique" unique ("attribute_name", "provider");',
    );
  }
}
