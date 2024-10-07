import {
  Abstract,
  DynamicModule,
  Inject,
  Injectable,
  Provider,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { POLYMORPHIC_MODULE_UNIQUE_IMPLEMENTATION_FACTORY_OPTIONS } from '../constants/polymorphic-module.constants';
import { PolymorphicModuleUniqueImplementationFactoryOptions } from '../interface/polymorphic-module.unique-implementation-factory-options.interface';

@Injectable()
export class PolymorphicModuleUniqueImplementationFactory<
  T extends string | number | symbol,
> {
  constructor(
    @Inject(POLYMORPHIC_MODULE_UNIQUE_IMPLEMENTATION_FACTORY_OPTIONS)
    private readonly uniqueImplementationFactoryOptions: PolymorphicModuleUniqueImplementationFactoryOptions<T>,
  ) {}

  getOverridenProviders(): Provider[] {
    const overridenProviders: Provider[] =
      this.uniqueImplementationFactoryOptions.injectionTokens.map(
        (injectionToken: Abstract<unknown>) =>
          this.overrideProvider(injectionToken),
      );

    return overridenProviders;
  }

  private overrideProvider(injectionToken: Abstract<unknown>): Provider {
    const overridenProvider: Provider = {
      provide: injectionToken,
      useFactory: async (request: Request) => {
        const childModule: DynamicModule = await this.getChildModule(request);

        const injectionTokenNameAsChildProviderName: string =
          this.transformInjectionTokenNameIntoChildProviderName(
            childModule,
            injectionToken.name,
          );

        const overridenProvider: Provider | undefined =
          childModule.providers?.find(
            (provider: Provider) =>
              (provider as any).name === injectionTokenNameAsChildProviderName,
          );

        if (!overridenProvider) {
          throw new Error(
            `InjectionToken ${injectionToken.name} can not provide ${injectionTokenNameAsChildProviderName} implementation`,
          );
        }

        return overridenProvider;
      },
      inject: [REQUEST],
    };

    return overridenProvider;
  }

  private transformInjectionTokenNameIntoChildProviderName(
    childModule: DynamicModule,
    injectionTokenName: string,
  ): string {
    const childModuleNameAsProviderPrefix: string | undefined =
      this.getChildModuleName(childModule);

    const injectionTokenModuleNamePrefix: boolean = !!this
      .uniqueImplementationFactoryOptions.namingOptions
      ?.parentCommonInjectionTokenPrefix
      ? true
      : false;

    if (
      !this.uniqueImplementationFactoryOptions.namingOptions ||
      (!injectionTokenModuleNamePrefix && !childModuleNameAsProviderPrefix)
    ) {
      return injectionTokenName;
    }

    return injectionTokenModuleNamePrefix
      ? injectionTokenName.replace(
          this.uniqueImplementationFactoryOptions.namingOptions
            ?.parentCommonInjectionTokenPrefix ?? '',
          childModuleNameAsProviderPrefix ?? '',
        )
      : `${childModuleNameAsProviderPrefix ?? ''}${injectionTokenName}`;
  }

  private async getChildModule(request: Request): Promise<DynamicModule> {
    const child: T = await this.uniqueImplementationFactoryOptions.getProvider(
      request,
    );
    return this.uniqueImplementationFactoryOptions.moduleImplementations[child];
  }

  private getChildModuleName(childModule: DynamicModule): string | undefined {
    return this.uniqueImplementationFactoryOptions.namingOptions
      ?.hasChildsModuleName
      ? childModule.module.name.replace(
          this.uniqueImplementationFactoryOptions.namingOptions
            .childModuleCustomSufix ?? 'Module',
          '',
        )
      : undefined;
  }
}
