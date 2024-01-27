import {
  DateTimeType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ProductLeaderboard } from '../../../../../domain/product-leaderboard/interface/product-leaderboard.interface';
import { ProductMikroOrm } from '../../product/entity/product.mikro-orm.entity';
import { LeaderboardMikroOrm } from '../../leaderboard/entity/leaderboard.mikro-orm.entity';

@Entity({ tableName: 'product_leaderboard' })
export class ProductLeaderboardMikroOrm implements ProductLeaderboard {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string;

  @ManyToOne(() => ProductMikroOrm, {
    onDelete: 'RESTRICT',
    onUpdateIntegrity: 'RESTRICT',
    nullable: false,
    joinColumn: 'product_id',
    mapToPk: true,
    cascade: [],
  })
  productId: string;

  @ManyToOne(() => LeaderboardMikroOrm, {
    onDelete: 'RESTRICT',
    onUpdateIntegrity: 'RESTRICT',
    nullable: false,
    joinColumn: 'leaderboard_id',
    mapToPk: true,
    cascade: [],
  })
  leaderboardId: string;

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
  toDomain(): ProductLeaderboard {
    return {
      id: this.id,
      productId: this.productId,
      leaderboardId: this.leaderboardId,
    };
  }
}
