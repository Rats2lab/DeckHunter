import { DynamicModule } from '@nestjs/common';

export type PolymorphicModuleImplementations<
  T extends string | number | symbol,
> = {
  [K in T]: DynamicModule;
};
