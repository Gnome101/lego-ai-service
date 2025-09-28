import axios from 'axios';
import * as dotenv from 'dotenv';

const STEP_BY_STEP_CAR_EXAMPLE = "../examples/step-by-step-car.ts"

dotenv.config();

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenRouterService {
  private apiKey: string;
  private apiUrl: string = 'https://openrouter.ai/api/v1/chat/completions';

  constructor() {
    this.apiKey = process.env.OPEN_ROUTER_KEY || '';

    if (!this.apiKey) {
      console.warn('OpenRouter API key not configured');
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async generateBuildingCode(
    prompt: string,
    availableParts: string,
    builderAPI: string,
    model?: string
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('OpenRouter API key not configured');
    }

    // Default to a good open source model if not specified
    const selectedModel = model || 'anthropic/claude-3.5-sonnet';

    const systemPrompt = `You are a LEGO building assistant that generates TypeScript code to create LEGO models using the LDrawBuilder API.
DO NOT ADD ANY IMPORTS
THE CODE MUST STRICTLY FOLLOW THE EXAMPLES AND THE API SPECIFICATIONS

${builderAPI}

Available parts (partial list):
${availableParts}

Here's an example of a well-structured build with step-by-step instructions:
${STEP_BY_STEP_CAR_EXAMPLE}

Important guidelines:
1. Generate ONLY executable TypeScript code, no explanations
2. Use the builder methods to place parts at appropriate coordinates
3. Start with "const builder = new LDrawBuilder();"
4. End with "builder.save('model.ldr');"
DO NOT MAKE A FLOOR or GROUND
5. Use proper LDraw units (1 stud = 20 LDU, 1 plate height = 8 LDU, 1 brick height = 24 LDU)
6. CRITICAL: In LDraw, the Y-axis is INVERTED - negative Y values go UP, positive Y values go DOWN
7. Place parts logically to create a recognizable structure
8. Use appropriate colors from the Colors object
9. Use for loops and arrays for repetitive elements (like wheels, windows, patterns)
10. Use builder.addStep() to separate major building phases for clarity
11. Return ONLY the code, no markdown or explanations`;

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Build: ${prompt}` }
    ];

    try {
      const response = await axios.post<OpenRouterResponse>(
        this.apiUrl,
        {
          model: selectedModel,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: false
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://github.com/Gnome101/lego-ai-service',
            'X-Title': 'LEGO AI Service'
          }
        }
      );

      const code = response.data.choices[0].message.content;
      return this.cleanCode(code);
    } catch (error: any) {
      console.error('OpenRouter API Error:', error.response?.data || error.message);
      throw new Error(`Failed to generate building code via OpenRouter: ${error.message}`);
    }
  }

  private cleanCode(code: string): string {
    // Remove markdown code blocks if present
    let cleaned = code.replace(/```typescript\n?/g, '').replace(/```\n?/g, '');

    // Remove any leading/trailing whitespace
    cleaned = cleaned.trim();

    // If the code doesn't start with const or import, try to find where the actual code starts
    if (!cleaned.startsWith('const') && !cleaned.startsWith('import')) {
      const codeStart = cleaned.indexOf('const builder');
      if (codeStart !== -1) {
        cleaned = cleaned.substring(codeStart);
      }
    }

    return cleaned;
  }

  // Get list of available models on OpenRouter
  static getAvailableModels() {
    return {
      'OpenAI': [
        'openai/gpt-4-turbo',
        'openai/gpt-4',
        'openai/gpt-3.5-turbo',
        'openai/o1-preview',
        'openai/o1-mini'
      ],
      'Anthropic': [
        'anthropic/claude-3.5-sonnet',
        'anthropic/claude-3-opus',
        'anthropic/claude-3-sonnet',
        'anthropic/claude-3-haiku'
      ],
      'Google': [
        'google/gemini-pro-1.5',
        'google/gemini-pro',
        'google/gemini-flash-1.5'
      ],
      'Meta': [
        'meta-llama/llama-3.2-90b-vision-instruct',
        'meta-llama/llama-3.1-405b-instruct',
        'meta-llama/llama-3.1-70b-instruct',
        'meta-llama/llama-3.1-8b-instruct'
      ],
      'Mistral': [
        'mistralai/mistral-large',
        'mistralai/mixtral-8x22b-instruct',
        'mistralai/mixtral-8x7b-instruct'
      ],
      'Others': [
        'qwen/qwen-2.5-72b-instruct',
        'deepseek/deepseek-chat',
        'nvidia/llama-3.1-nemotron-70b-instruct',
        'x-ai/grok-2',
        'inflection/inflection-3-pi'
      ]
    };
  }
}