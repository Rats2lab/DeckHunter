import { Migration } from '@mikro-orm/migrations';

export class Migration20241007170226_alter_product_attribute extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "product_attribute" drop constraint if exists "product_attribute_provider_check";',
    );

    this.addSql(
      'alter table "product_attribute" alter column "provider" type text using ("provider"::text);',
    );
    this.addSql(
      'alter table "product_attribute" add constraint "product_attribute_provider_check" check ("provider" in (\'open_ai\', \'anthropic_ai\', \'ollama\'));',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "product_attribute" drop constraint if exists "product_attribute_provider_check";',
    );

    this.addSql(
      'alter table "product_attribute" alter column "provider" type text using ("provider"::text);',
    );
    this.addSql(
      'alter table "product_attribute" add constraint "product_attribute_provider_check" check ("provider" in (\'open_ai\', \'anthropic_ai\'));',
    );
  }
}
