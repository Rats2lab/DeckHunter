import {
  Abstract,
  DynamicModule,
  Inject,
  Injectable,
  Provider,
  Scope,
} from '@nestjs/common';
import {
  CHILD_COMMON_SUFIX,
  MODULE_IMPLEMENTATIONS,
  PARENT_MODULE_PREFIX,
  POLYMORPHIC_INJECTION_TOKENS,
} from '../constants/polymorphic-module.constants';

export type PolymorphicModuleImplementations<
  T extends Record<string, string | number | boolean>,
> = {
  [K in keyof T]: DynamicModule;
};

@Injectable({ scope: Scope.REQUEST })
export class PolymorphicModuleFactory<
  T extends Record<string, string | number | boolean>,
> {
  constructor(
    @Inject(POLYMORPHIC_INJECTION_TOKENS)
    private readonly polymorphicInjectionTokens: Abstract<unknown>[],
    @Inject(MODULE_IMPLEMENTATIONS)
    private readonly polymorphicModuleImplementations: PolymorphicModuleImplementations<T>,
    @Inject(PARENT_MODULE_PREFIX)
    private readonly parentModulePrefix: string,
    @Inject(CHILD_COMMON_SUFIX)
    private readonly childCommonSufix?: string,
  ) {}

  getOverridenProviders(child: keyof T): Provider[] {
    const childModule: DynamicModule = this.getChildModule(child);

    const childModulePrefix: string = childModule.module.name.replace(
      this.childCommonSufix ?? 'Module',
      '',
    );

    // Mock para los que no existan? con un throw por defecto?
    const overridableProviders: Provider[] = childModule.providers.filter(
      (provider: Provider) => (provider as any).name,
    );

    // Cambiar el bucle, iterar polymorphicInjectionTokens y setear los valores de moduleImplementations
    // En caso de no existir cascar un throw not implemented o pedir una excepción

    return overridableProviders
      .map((provider: Provider & { name: unknown }) =>
        this.overrideProvider(provider, childModulePrefix),
      )
      .filter((provider: Provider) => provider);
  }

  private getChildModule(child: keyof T): DynamicModule {
    return this.polymorphicModuleImplementations[child];
  }

  private overrideProvider(
    childProvider: Provider & { name: unknown },
    childModulePrefix: string,
  ): Provider | undefined {
    if (!childProvider.name || typeof childProvider.name !== 'string') {
      return;
    }

    const overridenProviderName: string = childProvider.name.replace(
      childModulePrefix,
      this.parentModulePrefix,
    );

    const injectionTokenToOverride: Abstract<unknown> | undefined =
      this.polymorphicInjectionTokens.find(
        (injectionToken: Abstract<unknown>) =>
          injectionToken.name === overridenProviderName,
      );

    if (!injectionTokenToOverride) {
      return;
    }

    const overridenProvider: Provider = {
      provide: injectionTokenToOverride,
      scope: Scope.REQUEST,
      useExisting: childProvider,
    };

    return overridenProvider;
  }
}
