import {
  BigIntType,
  DateTimeType,
  DateType,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Product } from '../../../../../domain/product/interface/product.interface';
import { Author } from '../../../../../domain/author/interface/author.interface';

@Entity({ tableName: 'product' })
export class ProductMikroOrm implements Product {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string;

  @PrimaryKey({
    columnType: 'jsonb',
  })
  author: Author;

  @Property({
    length: 100,
  })
  title: string;

  @Property({
    length: 500,
  })
  description: string;

  @Property({
    type: DateType,
  })
  launchDate: Date;

  @Property({
    type: BigIntType,
  })
  votes: number;

  @Property({ length: 3 })
  country: string;

  @Property({
    type: DateTimeType,
    columnType: 'timestampz',
  })
  createdAt: Date;

  @Property({
    type: DateTimeType,
    columnType: 'timestampz',
  })
  updatedAt: Date;

  @Property({ persist: false, hidden: true })
  toDomain(): Product {
    return {
      id: this.id,
      author: this.author,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      country: this.country,
    };
  }
}
