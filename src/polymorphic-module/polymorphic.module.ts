import { DynamicModule, Module } from '@nestjs/common';
import { POLYMORPHIC_MODULE_UNIQUE_IMPLEMENTATION_FACTORY_OPTIONS } from './constants/polymorphic-module.constants';
import { PolymorphicModuleUniqueImplementationFactory } from './factory/polymorphic-module.unique-implmentation.factory';
import { PolymorphicModuleUniqueImplementationFactoryOptions } from './interface/polymorphic-module.unique-implementation-factory-options.interface';

@Module({})
export class PolymorphicModule {
  static registerUniqueImplementation<T extends string | number | symbol>(
    polymorphicModuleUniqueImplementationFactoryOptions: PolymorphicModuleUniqueImplementationFactoryOptions<T>,
  ): DynamicModule {
    return {
      module: PolymorphicModule,
      providers: [
        PolymorphicModuleUniqueImplementationFactory<T>,
        {
          provide: POLYMORPHIC_MODULE_UNIQUE_IMPLEMENTATION_FACTORY_OPTIONS,
          useValue: polymorphicModuleUniqueImplementationFactoryOptions,
        },
      ],
      exports: [PolymorphicModuleUniqueImplementationFactory<T>],
    };
  }
}
