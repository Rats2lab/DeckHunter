import {
  BigIntType,
  Collection,
  DateTimeType,
  DateType,
  Entity,
  Enum,
  Index,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Product } from '../interface/product.interface';
import { LeaderboardMikroOrm } from '../../leaderboard/entity/leaderboard.mikro-orm.entity';
import { ProductLeaderboardMikroOrm } from '../../product-leaderboard/entity/product-leaderboard.mikro-orm.entity';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';

@Index({ properties: ['providerExternalId', 'provider'] })
@Entity({ tableName: 'product' })
export class ProductMikroOrm implements Product {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string;

  @Property({ length: 50 })
  providerExternalId: string;

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

  @Enum({ items: () => ProductProviderName })
  provider: ProductProviderName;

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
      providerExternalId: this.providerExternalId,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      provider: this.provider,
      leaderboards: this.leaderboards.isInitialized()
        ? this.leaderboards.getItems()
        : [],
    };
  }
}
