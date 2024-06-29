import { Migration } from '@mikro-orm/migrations';

export class Migration20240629174416_alter_product_add_tagline_column extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "product" add column "tagline" varchar(250) not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop column "tagline";');
  }
}
