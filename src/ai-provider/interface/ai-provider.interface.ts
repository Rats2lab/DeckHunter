import { InjectionToken } from '@nestjs/common';
import { AiProviderName } from '../enum/ai-provider.name';
import { AnthropicAiNestjsModule } from '../../anthropic-ai/anthropic-ai.nestjs.module';

type AiProviderValue = { providerName: AiProviderName; instance: any };

export interface AiProviderProvider {
  provide: InjectionToken;
  values: AiProviderValue[];
}

export class AiProviderProviders {
  private readonly providers: AiProviderProvider[];

  constructor() {
    // Cojo un listado de modulos -> Los tengo en los import? debo tenerlos o encontrará los provider sin problema?
    // Evaluo que contengan el metodo register y que me devuelva un DynamicModule
    // Obtengo los proveedores y los auno
  }
}
