import { DynamicModule, Module, Provider } from '@nestjs/common';
import { UtilsMother } from '../../test/mother/utils.mother';
import { AnthropicAiNestjsModule } from '../anthropic-ai/anthropic-ai.nestjs.module';
import { OllamaNestjsModule } from '../ollama/ollama.nestjs.module';
import { OpenAiNestjsModule } from '../open-ai/open-ai.nestjs.module';
import { PolymorphicModuleUniqueImplementationFactory } from '../polymorphic-module/factory/polymorphic-module.unique-implmentation.factory';
import { PolymorphicModuleUniqueImplementationFactoryOptions } from '../polymorphic-module/interface/polymorphic-module.unique-implementation-factory-options.interface';
import { PolymorphicModule } from '../polymorphic-module/polymorphic.module';
import { PolymorphicModuleImplementations } from '../polymorphic-module/type/polymorphic-module.implementations.type';
import { AiProviderName } from './enum/ai-provider.name.enum';
import { AiProviderSendMessageService } from './service/ai-provider.send-message.service';

@Module({})
export class AiProviderNestjsModule {
  static register(): DynamicModule {
    const polymorphicModuleImplementations: PolymorphicModuleImplementations<AiProviderName> =
      {
        [AiProviderName.ANTHROPIC]: AnthropicAiNestjsModule.register(),
        [AiProviderName.OLLAMA]: OllamaNestjsModule.register(),
        [AiProviderName.OPEN_AI]: OpenAiNestjsModule.register(),
      };

    const uniqueImplementationFactoryOptions: PolymorphicModuleUniqueImplementationFactoryOptions<AiProviderName> =
      {
        injectionTokens: [AiProviderSendMessageService],
        moduleImplementations: polymorphicModuleImplementations,
        namingOptions: {
          parentCommonInjectionTokenPrefix: 'AiProvider',
          hasChildsModuleName: true,
          childModuleCustomSufix: 'NestjsModule',
        },
        getProvider: AiProviderNestjsModule.decideProvider, // TBD
      };

    const overridenProviders: Provider[] =
      new PolymorphicModuleUniqueImplementationFactory<AiProviderName>(
        uniqueImplementationFactoryOptions,
      ).getOverridenProviders();

    return {
      module: AiProviderNestjsModule,
      imports: [
        PolymorphicModule.registerUniqueImplementation<AiProviderName>( // Necessary?
          uniqueImplementationFactoryOptions,
        ),
        ...Object.values(polymorphicModuleImplementations),
      ],
      providers: [...overridenProviders],
      exports: [...overridenProviders],
    };
  }

  // Just testing
  private static async decideProvider(
    request: Request,
  ): Promise<AiProviderName> {
    const aiProvider: AiProviderName =
      UtilsMother.getRandomArrayElement<AiProviderName>(
        Object.values(AiProviderName as object),
      );

    return aiProvider;
  }
}
