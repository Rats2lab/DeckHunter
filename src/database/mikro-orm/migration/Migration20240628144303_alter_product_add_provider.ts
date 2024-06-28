import { Migration } from '@mikro-orm/migrations';

export class Migration20240628144303_alter_product_add_provider extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "provider_external_id" varchar(50) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop column "provider_external_id";');
  }

}
