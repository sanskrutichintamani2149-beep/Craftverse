import fs from 'fs';
import path from 'path';

console.log('=== Checking for exposed secrets in frontend codebase ===');

const srcDir = path.resolve('src');

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (/\.(tsx?|jsx?|html|css|json)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (/AIza[0-9A-Za-z\-_]{35}/.test(content)) {
        throw new Error(`CRITICAL SECURITY FAILURE: Gemini API key pattern found in frontend file: ${fullPath}`);
      }
      if (/VITE_GEMINI/i.test(content)) {
        throw new Error(`CRITICAL SECURITY FAILURE: Client-exposed VITE_GEMINI variable found in: ${fullPath}`);
      }
    }
  }
}

scanDirectory(srcDir);
console.log('PASSED: No API keys or VITE_GEMINI variables found in src/');
