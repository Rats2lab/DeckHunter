import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { TelegramBotConversationResponse } from '../interface/telegram-bot.conversation-response.interface';
import { TelegramBotSendTextParameters } from '../interface/telegram-bot.send-text-parameters.interface';

@Injectable()
export class TelegramBotRepository {
  constructor(private readonly httpService: HttpService) {}

  async sendText(
    sendTextParameters: TelegramBotSendTextParameters,
  ): Promise<boolean> {
    await lastValueFrom(
      this.httpService.post<TelegramBotConversationResponse>(
        `https://api.telegram.org/bot${sendTextParameters.botToken}/sendMessage?parse_mode=HTML`,
        {
          chat_id: sendTextParameters.chatId,
          text: sendTextParameters.text,
        },
      ),
    );

    return true;
  }
}
