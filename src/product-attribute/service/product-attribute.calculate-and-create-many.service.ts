import { Injectable } from '@nestjs/common';
import { AnthropicAiSendMessageResponse } from '../../anthropic-ai/interface/anthropic-ai.send-message-response.interface';
import { OllamaSendMessageService } from '../../ollama/service/ollama.send-message.service';
import { ProductPromptCreateAttributes } from '../../product/type/product.prompt-create-attributes.type';
import { ProductAttributeProvider } from '../enum/product-attribute.provider.enum';
import { ProductAttributeCreateAiResponse } from '../interface/product-attribute.create-ai-response.interface';
import { ProductAttribute } from '../interface/product-attribute.interface';
import { ProductAttributeCreate } from '../type/product-attribute.create.type';
import { ProductAttributeCreateManyService } from './product-attribute.create-many.service';
import { ProductAttributeCreatePromptToCreateAttributesService } from './product-attribute.create-prompt-to-create-attributes.service';

@Injectable()
export class ProductAttributeCalculateAndCreateManyService {
  constructor(
    private readonly ollamaSendMessageService: OllamaSendMessageService,
    private readonly productAttributeCreateManyService: ProductAttributeCreateManyService,
    private readonly productAttributeCreateManyPromptsToCreateAttributesService: ProductAttributeCreatePromptToCreateAttributesService,
  ) {}

  async createMany(
    productsWithoutAttributes: ProductPromptCreateAttributes[],
  ): Promise<ProductAttribute[]> {
    let createdProductAttributes: ProductAttribute[] = [];
    for (const productWithoutAttributes of productsWithoutAttributes) {
      try {
        const generatedPrompt: string =
          await this.productAttributeCreateManyPromptsToCreateAttributesService.createPrompt(
            productWithoutAttributes,
          );

        const aiResponse: AnthropicAiSendMessageResponse =
          await this.ollamaSendMessageService.sendMessage({
            content: generatedPrompt,
          });

        const productAttributesCreate: ProductAttributeCreate[] =
          this.proccessAiResponse(productWithoutAttributes, aiResponse);

        if (productAttributesCreate.length) {
          const chunkCreatedProductAttributes: ProductAttribute[] =
            await this.productAttributeCreateManyService.createMany(
              productAttributesCreate,
            );

          createdProductAttributes = createdProductAttributes.concat(
            chunkCreatedProductAttributes,
          );
        }
      } catch (_ignoredException) {}
    }

    return createdProductAttributes;
  }

  private proccessAiResponse(
    productWithoutAttributes: ProductPromptCreateAttributes,
    aiResponse: AnthropicAiSendMessageResponse,
  ): ProductAttributeCreate[] {
    try {
      const processedResponse: ProductAttributeCreateAiResponse[] = JSON.parse(
        this.cleanResponseBeforeParse(aiResponse.response),
      );

      return processedResponse.map((productAttributeCreate) => ({
        productId: productWithoutAttributes.id,
        attributeName: productAttributeCreate.attribute,
        provider: ProductAttributeProvider.OLLAMA,
        processedOutput: productAttributeCreate.output,
      }));
    } catch (_ignoredException) {}

    return [];
  }

  private cleanResponseBeforeParse(response: string): string {
    return response.replace('```json', '').replace('```', '');
  }
}
