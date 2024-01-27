import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class FakeMikroOrm {
  @PrimaryKey()
  id: string;
}
