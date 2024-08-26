import { Injectable } from '@nestjs/common';
import { ProductPromptCreateAttributes } from '../../product/type/product.prompt-create-attributes.type';
import { ProductAttributeName } from '../enum/product-attribute.name.enum';

@Injectable()
export class ProductAttributeCreatePromptToCreateAttributesService {
  async createPrompt(
    productWithoutAttributes: ProductPromptCreateAttributes,
  ): Promise<string> {
    const procutAttributeNames: string = JSON.stringify(
      Object.values(ProductAttributeName),
    );

    const bodyTag: string = '#BODY#';
    const basePrompt: string =
      `Eres un experto en hacer "pitch deck" de startups.` +
      ` Aporta información para cada uno de los "attribute"` +
      ` (${procutAttributeNames}) correspondientes al siguiente productos: ${bodyTag}\n` +
      `No más de dos frases por atributo. Que tu respuesta sea única y exclusivamente un JSON en inglés con el formato:` +
      ` [{"attribute":"","output":""}]`;

    const productBodyContent: string = `\n- ${productWithoutAttributes.tagline} -> ${productWithoutAttributes.description}`;

    return basePrompt.replace(bodyTag, productBodyContent);
  }
}
