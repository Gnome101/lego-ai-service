import { AIService } from './aiService';
import { OpenRouterService } from './openRouterService';

export class ModelService {
  private aiService: AIService;
  private openRouterService: OpenRouterService;

  // Snowflake Cortex models
  private static SNOWFLAKE_MODELS = [
    'claude-3-5-sonnet',
    'claude-3-5-haiku',
    'claude-3-opus',
    'claude-3-sonnet',
    'claude-3-haiku',
    'llama3.1-405b',
    'llama3.1-70b',
    'llama3.1-8b',
    'llama3-70b',
    'llama3-8b',
    'llama2-70b-chat',
    'mistral-large',
    'mistral-large2',
    'mixtral-8x7b',
    'mistral-7b',
    'gemma-7b',
    'arctic',
    'reka-core',
    'reka-flash'
  ];

  // Top OpenRouter models from rankings (verified available)
  private static TOP_OPENROUTER_MODELS = [
    'anthropic/claude-3.5-sonnet',
    'anthropic/claude-3.5-sonnet:beta',
    'anthropic/claude-sonnet-4',
    'google/gemini-2.5-flash-preview-09-2025',
    'google/gemini-2.5-flash',
    'google/gemini-2.5-flash-lite',
    'google/gemini-2.0-flash-001',
    'openai/gpt-4o-mini',
    'openai/gpt-5',
    'openai/gpt-5-codex',
    'mistralai/mistral-nemo',
    'gryphe/mythomax-l2-13b',
    'meta-llama/llama-3.3-70b-instruct:free',
    'meta-llama/llama-3.1-8b-instruct',
    'deepseek/deepseek-chat-v3-0324',
    'deepseek/deepseek-chat-v3.1:free',
    'deepseek/deepseek-chat-v3-0324',
    'x-ai/grok-code-fast-1',
    'x-ai/grok-4-fast:free',
    'moonshotai/kimi-k2',
    'qwen/qwen3-coder'
  ];

  // Additional popular OpenRouter models
  private static ADDITIONAL_OPENROUTER_MODELS = [
    'openai/gpt-4-turbo',
    'openai/gpt-4',
    'openai/gpt-3.5-turbo',
    'openai/o1-preview',
    'openai/o1-mini',
    'anthropic/claude-3-opus',
    'anthropic/claude-3-haiku',
    'google/gemini-pro-1.5',
    'google/gemini-pro',
    'meta-llama/llama-3.1-405b-instruct',
    'meta-llama/llama-3.1-70b-instruct',
    'mistralai/mistral-large',
    'mistralai/mixtral-8x22b-instruct',
    'qwen/qwen-2.5-72b-instruct',
    'x-ai/grok-2',
    'nvidia/llama-3.1-nemotron-70b-instruct'
  ];

  constructor() {
    this.aiService = new AIService();
    this.openRouterService = new OpenRouterService();
  }

  /**
   * Automatically detects which provider to use based on the model name
   */
  async generateBuildingCode(
    prompt: string,
    availableParts: string,
    builderAPI: string,
    model?: string
  ): Promise<string> {
    const selectedModel = model || 'claude-3-5-sonnet';

    // First, try to find the full model name if a simplified name was provided
    const fullModelName = this.resolveModelName(selectedModel);

    // Check if it's a Snowflake model
    if (this.isSnowflakeModel(fullModelName)) {
      console.log(`Using Snowflake for model: ${fullModelName}`);
      return this.aiService.generateBuildingCode(
        prompt,
        availableParts,
        builderAPI,
        fullModelName
      );
    }

    // Otherwise, try OpenRouter
    if (this.openRouterService.isConfigured()) {
      console.log(`Using OpenRouter for model: ${fullModelName}`);
      return this.openRouterService.generateBuildingCode(
        prompt,
        availableParts,
        builderAPI,
        fullModelName
      );
    }

    // If OpenRouter is not configured and model is not on Snowflake, throw error
    throw new Error(
      `Model "${selectedModel}" is not available on Snowflake Cortex. ` +
      `To use this model, configure OpenRouter by setting OPEN_ROUTER_KEY environment variable.`
    );
  }

  private isSnowflakeModel(model: string): boolean {
    // Remove any provider prefix if present
    const modelName = model.includes('/') ? model.split('/')[1] : model;

    return ModelService.SNOWFLAKE_MODELS.includes(modelName) ||
           ModelService.SNOWFLAKE_MODELS.includes(model);
  }

  /**
   * Resolves a simplified model name to its full name
   * Users can type just "gpt-4o-mini" instead of "openai/gpt-4o-mini"
   */
  private resolveModelName(model: string): string {
    // If it already has a provider prefix, return as is
    if (model.includes('/')) {
      return model;
    }

    // Create a map of simplified names to full names
    const modelMap: { [key: string]: string } = {};

    // Add all Snowflake models (they don't need prefixes)
    ModelService.SNOWFLAKE_MODELS.forEach(m => {
      modelMap[m.toLowerCase()] = m;
      // Also map without version numbers for convenience
      const simpleName = m.replace(/[-.]\d+(\.\d+)?[a-z]?$/i, '');
      if (simpleName !== m) {
        modelMap[simpleName.toLowerCase()] = m;
      }
    });

    // Add all OpenRouter models
    const allOpenRouterModels = [
      ...ModelService.TOP_OPENROUTER_MODELS,
      ...ModelService.ADDITIONAL_OPENROUTER_MODELS
    ];

    allOpenRouterModels.forEach(m => {
      const modelName = m.split('/')[1];
      // Map the base model name to the full name
      modelMap[modelName.toLowerCase()] = m;

      // Also create simplified versions
      // e.g., "gpt-4" for "openai/gpt-4-turbo"
      const simpleName = modelName.replace(/[-.]\d+(\.\d+)?[a-z-]*$/i, '');
      if (!modelMap[simpleName.toLowerCase()]) {
        modelMap[simpleName.toLowerCase()] = m;
      }

      // Special cases for common abbreviations
      if (m === 'openai/gpt-4o-mini') modelMap['gpt4o-mini'] = m;
      if (m === 'anthropic/claude-3.5-sonnet') modelMap['claude'] = m;
      if (m === 'anthropic/claude-3.5-sonnet') modelMap['sonnet'] = m;
      if (m === 'anthropic/claude-sonnet-4') modelMap['claude-4'] = m;
      if (m === 'google/gemini-2.5-flash') modelMap['gemini'] = m;
      if (m === 'meta-llama/llama-3.3-70b-instruct:free') modelMap['llama'] = m;
      if (m === 'mistralai/mistral-nemo') modelMap['mistral'] = m;
      if (m === 'deepseek/deepseek-chat-v3-0324') modelMap['deepseek'] = m;
      if (m === 'x-ai/grok-code-fast-1') modelMap['grok'] = m;
      if (m === 'x-ai/grok-4-fast:free') modelMap['grok-4'] = m;
      if (m === 'openai/gpt-5') modelMap['gpt5'] = m;
      if (m === 'openai/gpt-5-codex') modelMap['gpt-5-codex'] = m;
      if (m === 'qwen/qwen3-coder') modelMap['qwen3'] = m;
      if (m === 'moonshotai/kimi-k2') modelMap['kimi-k2'] = m;
    });

    // Check if the model exists in our map (case-insensitive)
    const lowerModel = model.toLowerCase();
    if (modelMap[lowerModel]) {
      return modelMap[lowerModel];
    }

    // If not found, return the original model name
    return model;
  }

  /**
   * Get list of all available models
   */
  static getAvailableModels() {
    return {
      'Snowflake Cortex (Default)': ModelService.SNOWFLAKE_MODELS,
      'Top 10 OpenRouter Models': ModelService.TOP_OPENROUTER_MODELS,
      'Additional OpenRouter Models': ModelService.ADDITIONAL_OPENROUTER_MODELS
    };
  }

  /**
   * Get recommended models for different use cases
   */
  static getRecommendedModels() {
    return {
      'Best Overall': 'claude-3-5-sonnet',
      'Fast & Cheap': 'google/gemini-flash-1.5',
      'High Quality': 'anthropic/claude-3.5-sonnet',
      'Open Source': 'meta-llama/llama-3.3-70b-instruct',
      'Budget': 'mistralai/mistral-nemo'
    };
  }
}