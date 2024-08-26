import { Injectable } from '@nestjs/common';
import { ProductPromptCreateAttributes } from '../../product/type/product.prompt-create-attributes.type';
import { ProductAttributeName } from '../enum/product-attribute.name.enum';

@Injectable()
export class ProductAttributeCreateManyPromptsToCreateAttributesService {
  async createManyPrompts(
    productsWithoutAttributes: ProductPromptCreateAttributes[],
  ): Promise<string[]> {
    const procutAttributeNames: string = JSON.stringify(
      Object.values(ProductAttributeName),
    );

    const bodyTag: string = '#BODY#';
    const basePrompt: string =
      `Eres un experto en hacer "pitch deck" de startups.` +
      ` Aporta información para cada uno de los "attributeName"` +
      ` (${procutAttributeNames}) correspondientes a cada uno de los siguientes productos: ${bodyTag}\n` +
      `No más de dos frases por atributo. Que tu respuesta sea única y exclusivamente un JSON en inglés con el formato:` +
      ` [{"productId":"uuidProduct_1","attributeName":"","output":""},{"productId":"uuidProduct_2","attributeName":"","output":""}]`;

    const productBodyLimit: number = 2;

    const createdPrompts: string[] = [];

    let productBodyContent: string = '';
    for (let i = 0; i < productsWithoutAttributes.length; i++) {
      const productWithoutAttributes: ProductPromptCreateAttributes =
        productsWithoutAttributes[i];

      const lastIteration: boolean = i === productsWithoutAttributes.length - 1;
      const hasToCreatePrompt: boolean =
        (i % productBodyLimit === 0 && i !== 0) || lastIteration;

      productBodyContent += `\n- ${productWithoutAttributes.id}: ${productWithoutAttributes.tagline} -> ${productWithoutAttributes.description}`;

      if (hasToCreatePrompt) {
        const createdPrompt: string = basePrompt.replace(
          bodyTag,
          productBodyContent,
        );

        createdPrompts.push(createdPrompt);

        productBodyContent = '';
      }
    }

    return createdPrompts;
  }
}
