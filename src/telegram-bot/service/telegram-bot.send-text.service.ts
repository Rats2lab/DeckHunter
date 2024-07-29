import { Injectable } from '@nestjs/common';
import { TelegramBotRepository } from '../repository/telegram-bot.respository';
import { TelegramBotSendTextParameters } from '../interface/telegram-bot.send-text-parameters.interface';

@Injectable()
export class TelegramBotSendTextService {
  constructor(private readonly telegramBotRepository: TelegramBotRepository) {}

  async sendText(
    sendTextParameters: TelegramBotSendTextParameters,
  ): Promise<boolean> {
    try {
      const response: boolean = await this.telegramBotRepository.sendText(
        sendTextParameters,
      );

      return response;
    } catch (exception: unknown) {
      return false;
    }
  }
}
