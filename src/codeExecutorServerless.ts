import * as vm from 'vm';
import { LDrawBuilder, Colors } from './ldrawBuilder';

export class CodeExecutor {
  private outputDir: string;

  constructor(outputDir: string = './output') {
    this.outputDir = outputDir;
  }

  async executeGeneratedCodeForContent(code: string, modelName: string = 'generated_model'): Promise<string> {
    try {
      console.log('Executing generated code...');

      let capturedContent = '';

      // Create a mock builder that captures the content
      const MockLDrawBuilder = class extends LDrawBuilder {
        save(filename: string): void {
          // Instead of saving to file, capture the content
          capturedContent = this.getContent();
        }
      };

      // Create a sandboxed context with our builder API
      const sandbox = {
        LDrawBuilder: MockLDrawBuilder,
        Colors: Colors,
        console: {
          log: (...args: any[]) => console.log('[AI]:', ...args)
        },
        require: (module: string) => {
          // Only allow specific modules
          if (module === './ldrawBuilder') {
            return { LDrawBuilder: MockLDrawBuilder, Colors };
          }
          throw new Error(`Module ${module} is not allowed`);
        }
      };

      // Create the context
      const context = vm.createContext(sandbox);

      // Wrap the code to ensure save is called
      const wrappedCode = `
        ${code}
        // Ensure save is called
        if (typeof builder !== 'undefined' && builder.save) {
          builder.save('${modelName}.ldr');
        } else {
          throw new Error('No builder instance found or save method not called');
        }
      `;

      // Execute the code with a timeout
      const options = {
        filename: 'generated.js',
        timeout: 5000, // 5 second timeout
        displayErrors: true
      };

      const script = new vm.Script(wrappedCode, options);
      script.runInContext(context, options);

      if (capturedContent) {
        console.log('Model successfully generated');
        return capturedContent;
      } else {
        throw new Error('No content was generated');
      }
    } catch (error: any) {
      console.error('Code execution error:', error.message);
      throw new Error(`Failed to execute generated code: ${error.message}`);
    }
  }

  async executeGeneratedCode(code: string, modelName: string = 'generated_model'): Promise<string> {
    // For compatibility, also return content
    const content = await this.executeGeneratedCodeForContent(code, modelName);
    return `${modelName}.ldr`;
  }

  // Validate that the generated code is safe
  validateCode(code: string): boolean {
    // Check for dangerous patterns
    const dangerousPatterns = [
      /process\./g,
      /require\s*\(\s*['"`][^'"`]*['"`]\s*\)/g, // Except our allowed modules
      /import\s+/g,
      /eval\s*\(/g,
      /Function\s*\(/g,
      /exec\s*\(/g,
      /spawn\s*\(/g,
      /__dirname/g,
      /__filename/g,
      /fs\./g,
      /path\./g
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        // Allow specific safe patterns
        if (pattern.toString().includes('require') &&
            (code.includes("require('./ldrawBuilder')") ||
             code.includes('require("./ldrawBuilder")'))) {
          continue;
        }
        console.warn(`Potentially dangerous pattern found: ${pattern}`);
        return false;
      }
    }

    // Check that code uses the builder API
    if (!code.includes('new LDrawBuilder') && !code.includes('builder')) {
      console.warn('Code does not appear to use the LDrawBuilder API');
      return false;
    }

    return true;
  }

  // Not needed in serverless but kept for compatibility
  cleanupOldFiles(keepLast: number = 5): void {
    // No-op in serverless environment
  }
}