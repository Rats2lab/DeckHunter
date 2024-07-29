import { TelegramBotMessage } from './telegram-bot.message.interface';

export interface TelegramBotConversation {
  update_id: number;
  message: TelegramBotMessage;
}
