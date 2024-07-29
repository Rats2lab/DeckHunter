import { Module } from '@nestjs/common';
import { TelegramBotRepository } from './repository/telegram-bot.respository';
import { TelegramBotSendTextService } from './service/telegram-bot.send-text.service';
import { TelegramBotSendAllNewProductsService } from './service/telegram-bot.send-all-new-products.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 0,
    }),
  ],
  providers: [
    TelegramBotRepository,
    TelegramBotSendAllNewProductsService,
    TelegramBotSendTextService,
  ],
  exports: [TelegramBotSendAllNewProductsService],
})
export class TelegramBotNestjsModule {}
