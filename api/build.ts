import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AIService } from '../src/aiService';
import { OpenRouterService } from '../src/openRouterService';
import { PartsDatabase } from '../src/partsDatabaseServerless';
import { PartSelector } from '../src/partSelector';
import { CodeExecutor } from '../src/codeExecutorServerless';

let isInitialized = false;
let database: PartsDatabase;
let partSelector: PartSelector;
let aiService: AIService;
let openRouterService: OpenRouterService;
let codeExecutor: CodeExecutor;

async function initialize() {
  if (!isInitialized) {
    database = new PartsDatabase();
    await database.loadParts('./parts.csv');
    partSelector = new PartSelector(database);
    aiService = new AIService();
    openRouterService = new OpenRouterService();
    codeExecutor = new CodeExecutor('./output');
    isInitialized = true;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  // Check API key
  const apiKey = req.headers['x-api-key'] as string;
  const validApiKey = process.env.API_KEY;

  if (!validApiKey) {
    console.error('API_KEY not configured in environment variables');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error'
    });
  }

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or missing API key. Please provide a valid X-API-Key header.'
    });
  }

  try {
    // Initialize services if not already done
    await initialize();

    const { prompt, model, provider } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    console.log(`Building model from prompt: ${prompt} (provider: ${provider || 'snowflake'})`);

    // Get relevant parts for the prompt
    const relevantParts = partSelector.getRelevantParts(prompt);
    const builderAPI = partSelector.getBuilderAPIDocumentation();

    // Choose AI provider
    let generatedCode: string;

    if (provider === 'openrouter') {
      // Use OpenRouter
      if (!openRouterService.isConfigured()) {
        return res.status(500).json({
          success: false,
          error: 'OpenRouter is not configured. Please set OPEN_ROUTER_KEY environment variable.'
        });
      }
      generatedCode = await openRouterService.generateBuildingCode(
        prompt,
        relevantParts,
        builderAPI,
        model
      );
    } else {
      // Default to Snowflake
      generatedCode = await aiService.generateBuildingCode(
        prompt,
        relevantParts,
        builderAPI,
        model
      );
    }

    // Validate the code
    if (!codeExecutor.validateCode(generatedCode)) {
      throw new Error('Generated code failed validation');
    }

    // Execute the code to generate LDR content
    const modelName = prompt.toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .substring(0, 30);

    const ldrContent = await codeExecutor.executeGeneratedCodeForContent(
      generatedCode,
      modelName
    );

    return res.status(200).json({
      success: true,
      ldrContent,
      modelName: `${modelName}.ldr`,
      generatedCode,
      partsUsed: relevantParts.split('\n').length - 1
    });

  } catch (error: any) {
    console.error('Build error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate model'
    });
  }
}