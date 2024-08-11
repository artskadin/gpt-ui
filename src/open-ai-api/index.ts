import OpenAI from "openai";
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions.ts";

export type SendMessageArgs = {
  model: string;
  messages: ChatCompletionMessageParam[];
}

class OpenAIApi {
  private openai: OpenAI;

  constructor(baseURL: string, apiKey: string) {
    this.openai = new OpenAI({ baseURL, apiKey, dangerouslyAllowBrowser: true });
  }

  async getGptModels(): Promise<OpenAI.Model[] | Error> {
    try {
      const allModelsVersions = await this.openai.models.list();

      return allModelsVersions.data
        .filter(model => model.id.includes('gpt'))
        .sort((a, b) => a.created - b.created)
    } catch (error) {
      throw error as Error
    }
  }

  async sendMessageToGpt({ model, messages }: SendMessageArgs) {
    try {
      const completion = await this.openai.chat.completions.create({
        model,
        messages
      })

      return completion
    } catch (error) {
      throw error as Error
    }
  }
}

export const openAIApi = new OpenAIApi(
  'https://api.proxyapi.ru/openai/v1',
  process.env['OPENAI_API_KEY'] || ''
)