import { Injectable } from '@nestjs/common';
import { TelegramBotSendTextParameters } from '../interface/telegram-bot.send-text-parameters.interface';
import { TelegramBotSendTextService } from './telegram-bot.send-text.service';
import { Product } from '../../product/interface/product.interface';
import { DateTime } from 'luxon';

@Injectable()
export class TelegramBotSendAllNewProductsService {
  constructor(
    private readonly telegramBotSendTextService: TelegramBotSendTextService,
  ) {}

  async sendAllNewProducts(
    sendTextParameters: Omit<TelegramBotSendTextParameters, 'text'>,
    productsToSend: Product[],
    date: Date,
  ): Promise<void> {
    let text: string = `⚡ Yesterday TOP 10 products! [${DateTime.fromJSDate(
      date,
    ).toFormat('dd-MM-yyyy')}]\n`;

    const sortedProducts: Product[] = productsToSend
      .sort((p) => p.votes)
      .slice(0, 10);

    let iteration: number = 0;

    for (const product of sortedProducts) {
      text += `\n\n${iteration + 1}.- <b>${product.title}</b>\n${
        product.tagline
      }\n > Link: ${product.link}`;

      iteration += 1;
    }

    text += `\n\nDon't forget to visit our <a href="https://deck-hunter.vercel.app/">web</a> to see more details`;

    try {
      await this.telegramBotSendTextService.sendText({
        ...sendTextParameters,
        text,
      });
    } catch (_ignoredException: unknown) {}
  }
}
