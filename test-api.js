// Test script for the LEGO AI Service API
const axios = require('axios');

// Configuration - update this if testing deployed version
const API_URL = process.env.API_URL || 'http://localhost:3000/api/build';

// Test prompts
const testPrompts = [
  "a simple red car",
  "a small house with a door",
  "a yellow truck",
  "a blue spaceship"
];

async function testAPI(prompt, model) {
  console.log(`\n🧱 Testing: "${prompt}"`);
  console.log('─'.repeat(50));

  try {
    const startTime = Date.now();

    const response = await axios.post(API_URL, {
      prompt: prompt,
      model: model
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    if (response.data.success) {
      console.log(`✅ Success in ${duration}s`);
      console.log(`📄 Model name: ${response.data.modelName}`);
      console.log(`🔧 Parts used: ${response.data.partsUsed}`);
      console.log(`📝 LDR content preview (first 200 chars):`);
      console.log(response.data.ldrContent.substring(0, 200) + '...');
    } else {
      console.log(`❌ Failed: ${response.data.error}`);
    }

  } catch (error) {
    console.error(`❌ Error: ${error.response?.data?.error || error.message}`);
  }
}

async function runTests() {
  console.log('🚀 LEGO AI Service API Test');
  console.log(`📍 Testing endpoint: ${API_URL}`);
  console.log('═'.repeat(50));

  // Test with default model (Claude 3.5 Sonnet)
  for (const prompt of testPrompts.slice(0, 1)) {
    await testAPI(prompt);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s between requests
  }

  console.log('\n═'.repeat(50));
  console.log('✨ All tests completed!');
}

// Run tests if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testAPI };