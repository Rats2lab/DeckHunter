import {
  BigIntType,
  Collection,
  DateTimeType,
  DateType,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ProductAuthor } from '../interface/product-author.interface';
import { Product } from '../interface/product.interface';
import { LeaderboardMikroOrm } from '../../leaderboard/entity/leaderboard.mikro-orm.entity';
import { ProductLeaderboardMikroOrm } from '../../product-leaderboard/entity/product-leaderboard.mikro-orm.entity';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';

@Entity({ tableName: 'product' })
export class ProductMikroOrm implements Product {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string;

  @Property({
    columnType: 'jsonb',
  })
  author: ProductAuthor;

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

  @ManyToMany({
    entity: () => LeaderboardMikroOrm,
    owner: true,
    nullable: true,
    pivotEntity: () => ProductLeaderboardMikroOrm,
    joinColumn: 'product_id',
    inverseJoinColumn: 'leaderboard_id',
    cascade: [],
  })
  leaderboards: Collection<LeaderboardMikroOrm>;

  @Property({
    type: DateTimeType,
    columnType: 'timestamp',
  })
  createdAt: Date;

  @Property({
    type: DateTimeType,
    columnType: 'timestamp',
  })
  updatedAt: Date;

  @Property({ persist: false, hidden: true })
  toDomain(): ProductWithLeaderboards {
    return {
      id: this.id,
      author: this.author,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      country: this.country,
      leaderboards: this.leaderboards.isInitialized()
        ? this.leaderboards.getItems()
        : [],
    };
  }
}
