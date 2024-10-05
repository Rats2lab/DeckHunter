import { Injectable } from '@nestjs/common';
import { ProductAttribute } from '../interface/product-attribute.interface';
import { Product } from '../../product/interface/product.interface';
import { ProductPromptCreateAttributes } from '../../product/type/product.prompt-create-attributes.type';
import { AnthropicAiSendMessageService } from '../../anthropic-ai/service/anthropic-ai.send-message.service';
import { AnthropicAiSendMessageResponse } from '../../anthropic-ai/interface/anthropic-ai.send-message-response.interface';
import { ProductAttributeCreateManyService } from './product-attribute.create-many.service';
import { ProductAttributeCreatePromptToCreateAttributesService } from './product-attribute.create-prompt-to-create-attributes.service';
import { ProductAttributeCreate } from '../type/product-attribute.create.type';
import { ProductAttributeCreateAiResponse } from '../interface/product-attribute.create-ai-response.interface';
import { ProductAttributeProvider } from '../enum/product-attribute.provider.enum';

@Injectable()
export class ProductAttributeCalculateAndCreateManyService {
  constructor(
    private readonly anthropicAiSendMessageService: AnthropicAiSendMessageService,
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
          await this.anthropicAiSendMessageService.sendMessage({
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
        aiResponse.response,
      );

      return processedResponse.map((productAttributeCreate) => ({
        productId: productWithoutAttributes.id,
        attributeName: productAttributeCreate.attribute,
        provider: ProductAttributeProvider.ANTHROPIC_AI,
        processedOutput: productAttributeCreate.output,
      }));
    } catch (_ignoredException) {}

    return [];
  }
}
