# LEGO AI Service

A serverless API service that generates LEGO models using AI (Snowflake Cortex).

## Features

- Accepts prompts to generate LEGO models
- Returns LDraw format (.ldr) content as JSON
- Uses Snowflake Cortex AI (Claude 3.5 Sonnet by default)
- Optimized for Vercel deployment

## API Endpoint

### POST /api/build

**Authentication Required**: Include your API key in the `X-API-Key` header.

Request headers:
```
X-API-Key: your-api-key-here
Content-Type: application/json
```

Request body:
```json
{
  "prompt": "a small red car",
  "model": "claude-3-5-sonnet" // optional, defaults to claude-3-5-sonnet
}
```

Response:
```json
{
  "success": true,
  "ldrContent": "0 Model Name\n...",
  "modelName": "small_red_car.ldr",
  "generatedCode": "const builder = new LDrawBuilder()...",
  "partsUsed": 15
}
```

Error responses:
- `401`: Invalid or missing API key
- `400`: Invalid request (missing prompt)
- `500`: Server error

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Set up environment variables in Vercel:
```bash
vercel env add SNOWFLAKE_PAT
vercel env add ACCOUNT_IDENTIFIER
vercel env add REBRICKABLE_API
vercel env add API_KEY
```

3. Deploy to production:
```bash
vercel --prod
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your credentials:
```
SNOWFLAKE_PAT=your_snowflake_pat
ACCOUNT_IDENTIFIER=your_account_identifier
REBRICKABLE_API=your_rebrickable_api_key
API_KEY=your_api_key_here
```

3. Run locally with Vercel CLI:
```bash
vercel dev
```

## Testing the API

Use the included test script:
```bash
node test-api.js
```

Or test with curl:
```bash
curl -X POST http://localhost:3000/api/build \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"prompt": "a simple house"}'
```

## Frontend Integration

To use this API in your frontend:

```javascript
const response = await fetch('https://your-api-url/api/build', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key-here'
  },
  body: JSON.stringify({
    prompt: 'a red sports car',
    model: 'claude-3-5-sonnet' // optional
  })
});

const data = await response.json();
console.log(data.ldrContent); // The LDraw file content
```

## Project Structure

- `/api/build.ts` - Main API endpoint
- `/src/aiService.ts` - Snowflake AI integration
- `/src/ldrawBuilder.ts` - LDraw format builder
- `/src/partsDatabase.ts` - LEGO parts database
- `/src/codeExecutor.ts` - Safe code execution
- `/vercel.json` - Vercel configuration