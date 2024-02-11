import {
  DateTimeType,
  DateType,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Leaderboard } from '../../../../../domain/leaderboard/interface/leaderboard.interface';

@Entity({ tableName: 'leaderboard' })
export class LeaderboardMikroOrm implements Leaderboard {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string;

  @Property({
    type: DateType,
  })
  date: Date;

  @Property({
    length: 255,
  })
  link: string;

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
  toDomain(): Leaderboard {
    return {
      id: this.id,
      date: this.date,
      link: this.link,
    };
  }
}
