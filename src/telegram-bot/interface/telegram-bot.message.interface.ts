import { TelegramBotChat } from './telegram-bot.chat.interface';
import { TelegramBotUser } from './telegram-bot.user.interface';

export interface TelegramBotMessage {
  message_id: number;
  from: TelegramBotUser;
  chat: TelegramBotChat;
  date: number;
  text: string;
}
