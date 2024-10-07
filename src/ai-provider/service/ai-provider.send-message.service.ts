export abstract class AiProviderSendMessageService {
  abstract sendMessage(sendMessage: any): Promise<any>;
}
