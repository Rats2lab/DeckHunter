import { TelegramBotChatType } from '../enum/telegram-bot.chat-type.enum';

export interface TelegramBotChat {
  id: number;
  first_name: string;
  username: string;
  type: TelegramBotChatType;
}
