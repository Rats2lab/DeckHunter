import { Migration } from '@mikro-orm/migrations';

export class Migration20240629162249_alter_product_add_provider extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" drop constraint if exists "product_provider_check";');

    this.addSql('alter table "product" alter column "provider" type text using ("provider"::text);');
    this.addSql('alter table "product" add constraint "product_provider_check" check ("provider" in (\'product_hunt\'));');
    this.addSql('alter table "product" alter column "provider" set not null;');
    this.addSql('alter table "product" alter column "provider_external_id" type varchar(50) using ("provider_external_id"::varchar(50));');
    this.addSql('alter table "product" alter column "provider_external_id" set not null;');
    this.addSql('create index "product_provider_external_id_provider_index" on "product" ("provider_external_id", "provider");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint if exists "product_provider_check";');

    this.addSql('alter table "product" alter column "provider_external_id" type varchar(50) using ("provider_external_id"::varchar(50));');
    this.addSql('alter table "product" alter column "provider_external_id" drop not null;');
    this.addSql('alter table "product" alter column "provider" type text using ("provider"::text);');
    this.addSql('alter table "product" add constraint "product_provider_check" check ("provider" in (\'product_hunt\'));');
    this.addSql('alter table "product" alter column "provider" drop not null;');
    this.addSql('drop index "product_provider_external_id_provider_index";');
  }

}
