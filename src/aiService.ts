import axios from 'axios';
import * as dotenv from 'dotenv';

const STEP_BY_STEP_CAR_EXAMPLE = "../examples/step-by-step-car.ts"
dotenv.config();

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class AIService {
  private accountIdentifier: string;
  private apiToken: string;
  private apiUrl: string;

  constructor() {
    this.accountIdentifier = (process.env.ACCOUNT_IDENTIFIER || '').trim();
    this.apiToken = (process.env.SNOWFLAKE_PAT || '').trim();

    if (!this.accountIdentifier || !this.apiToken) {
      throw new Error('Missing ACCOUNT_IDENTIFIER or SNOWFLAKE_PAT in .env file');
    }

    this.apiUrl = `https://${this.accountIdentifier}.snowflakecomputing.com/api/v2/cortex/inference:complete`;
  }

  async generateBuildingCode(
    prompt: string,
    availableParts: string,
    builderAPI: string,
    model?: string
  ): Promise<string> {
    const systemPrompt = `You are a LEGO building assistant that generates TypeScript code to create LEGO models using the LDrawBuilder API.
DO NOT ADD ANY IMPORTS
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
5. Use proper LDraw units (1 stud = 20 LDU, 1 plate height = 8 LDU, 1 brick height = 24 LDU)
DO NOT MAKE A FLOOR or GROUND
6. CRITICAL: In LDraw, the Y-axis is INVERTED - negative Y values go UP, positive Y values go DOWN
   - Parts stacked above should have NEGATIVE Y values (e.g., -8, -16, -24, -32, etc.)
   - Example: A brick on top of a base plate would be at Y = -24
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
      const response = await axios.post<AIResponse>(
        this.apiUrl,
        {
          model: model || 'claude-3-5-sonnet',
          messages,
          stream: false,
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiToken}`
          }
        }
      );

      const code = response.data.choices[0].message.content;

      // Clean up the response to ensure it's pure code
      const cleanedCode = this.cleanCode(code);
      return cleanedCode;
    } catch (error: any) {
      console.error('AI API Error:', error.response?.data || error.message);
      throw new Error(`Failed to generate building code: ${error.message}`);
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
}