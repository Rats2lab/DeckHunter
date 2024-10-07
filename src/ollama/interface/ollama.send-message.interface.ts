import { OllamaModel } from '../enum/ollama.model.enum';

export interface OllamaSendMessage {
  content: string;
  model?: string;
}
