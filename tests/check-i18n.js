import fs from 'fs';
import path from 'path';

console.log('=== Checking i18n translation key coverage and symmetry ===');

const i18nPath = path.resolve('src/i18n/index.ts');
const i18nContent = fs.readFileSync(i18nPath, 'utf8');

const enIdx = i18nContent.indexOf('  en: {');
const hiIdx = i18nContent.indexOf('  hi: {');
const mrIdx = i18nContent.indexOf('  mr: {');
const endIdx = i18nContent.indexOf('};', mrIdx);

if (enIdx === -1 || hiIdx === -1 || mrIdx === -1) {
  console.error('Could not locate en, hi, mr blocks');
  process.exit(1);
}

const enBlock = i18nContent.slice(enIdx, hiIdx);
const hiBlock = i18nContent.slice(hiIdx, mrIdx);
const mrBlock = i18nContent.slice(mrIdx, endIdx);

function extractKeys(text) {
  const keys = new Set();
  const lines = text.split('\n');
  const stack = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;
    if (trimmed.startsWith('translation:') || trimmed.startsWith('en:') || trimmed.startsWith('hi:') || trimmed.startsWith('mr:')) continue;

    // Check for section start: "sectionName: {"
    const sectionMatch = trimmed.match(/^([a-zA-Z0-9_]+):\s*\{/);
    if (sectionMatch) {
      stack.push(sectionMatch[1]);
      continue;
    }

    // Check for block end: "}," or "}"
    if (trimmed.startsWith('},') || trimmed === '}') {
      if (stack.length > 0) {
        stack.pop();
      }
      continue;
    }

    // Check for key-value: "keyName: '...'"
    const kvMatch = trimmed.match(/^([a-zA-Z0-9_]+):\s*['"`]/);
    if (kvMatch) {
      const fullKey = [...stack, kvMatch[1]].join('.');
      keys.add(fullKey);
    }
  }
  return keys;
}

const enKeys = extractKeys(enBlock);
const hiKeys = extractKeys(hiBlock);
const mrKeys = extractKeys(mrBlock);

console.log(`Found ${enKeys.size} keys in EN, ${hiKeys.size} keys in HI, ${mrKeys.size} keys in MR.`);

// Check symmetry
const missingInHi = [...enKeys].filter((k) => !hiKeys.has(k));
const missingInMr = [...enKeys].filter((k) => !mrKeys.has(k));

let hasErrors = false;

if (missingInHi.length > 0) {
  console.error(`ERROR: Missing ${missingInHi.length} keys in Hindi translation:`, missingInHi);
  hasErrors = true;
} else {
  console.log('PASSED: All EN keys exist in Hindi (hi)!');
}

if (missingInMr.length > 0) {
  console.error(`ERROR: Missing ${missingInMr.length} keys in Marathi translation:`, missingInMr);
  hasErrors = true;
} else {
  console.log('PASSED: All EN keys exist in Marathi (mr)!');
}

// Now scan src/**/*.tsx for t('key') calls and verify they exist in enKeys
const srcDir = path.resolve('src');
const missingUsedKeys = new Set();
let totalTCalls = 0;

function scanFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanFiles(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.matchAll(/\bt\(['"]([a-zA-Z0-9_.]+)['"]\)/g);
      for (const m of matches) {
        totalTCalls++;
        const key = m[1];
        if (!enKeys.has(key)) {
          missingUsedKeys.add(`${key} (in ${path.relative(srcDir, fullPath)})`);
        }
      }
    }
  }
}

scanFiles(srcDir);
console.log(`Scanned ${totalTCalls} t(...) calls across codebase.`);

if (missingUsedKeys.size > 0) {
  console.error(`ERROR: Found ${missingUsedKeys.size} t(...) calls referencing undefined keys:`, [...missingUsedKeys]);
  hasErrors = true;
} else {
  console.log('PASSED: All t(...) translation keys exist in dictionary!');
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log('ALL I18N CHECKS PASSED: Zero missing keys!');
}
