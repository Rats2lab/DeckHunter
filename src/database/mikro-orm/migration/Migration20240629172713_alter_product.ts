import { Migration } from '@mikro-orm/migrations';

export class Migration20240629172713_alter_product extends Migration {
  async up(): Promise<void> {
    this.addSql('drop index "product_provider_external_id_provider_index";');
    this.addSql(
      'alter table "product" add constraint "product_provider_external_id_provider_unique" unique ("provider_external_id", "provider");',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "product" drop constraint "product_provider_external_id_provider_unique";',
    );
    this.addSql(
      'create index "product_provider_external_id_provider_index" on "product" ("provider_external_id", "provider");',
    );
  }
}
