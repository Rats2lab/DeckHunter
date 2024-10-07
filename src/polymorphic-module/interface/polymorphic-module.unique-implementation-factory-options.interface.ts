import { Abstract } from '@nestjs/common';
import { DecideChildFunction } from '../type/polymorphic-module.decide-child-function.type';
import { PolymorphicModuleImplementations } from '../type/polymorphic-module.implementations.type';
import { PolymorphicModuleFactoryNamingOptions } from './polymorphic-module.factory-naming-options.interface';

export class PolymorphicModuleUniqueImplementationFactoryOptions<
  T extends string | number | symbol,
> {
  injectionTokens: Abstract<unknown>[];
  moduleImplementations: PolymorphicModuleImplementations<T>;
  namingOptions?: PolymorphicModuleFactoryNamingOptions;
  getProvider: DecideChildFunction<T>;
}
