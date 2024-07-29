import { TelegramBotConversation } from './telegram-bot.conversation.interface';

export interface TelegramBotConversationResponse {
  ok: boolean;
  result: TelegramBotConversation[];
}
