#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const assetsDir = join(process.cwd(), 'dist', 'assets');
const requiredFragments = [
  '[data-part=kb-board]',
  '[data-part=kb-card]',
  '[data-part=kb-column]',
];

async function main() {
  const entries = await readdir(assetsDir, { withFileTypes: true });
  const cssFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.css')).map((entry) => join(assetsDir, entry.name));

  if (cssFiles.length === 0) {
    throw new Error(`No CSS files found under ${assetsDir}. Run npm run build first.`);
  }

  const css = (await Promise.all(cssFiles.map((file) => readFile(file, 'utf8')))).join('\n');
  const missing = requiredFragments.filter((fragment) => !css.includes(fragment));

  if (missing.length > 0) {
    throw new Error(`Built CSS is missing Kanban selectors: ${missing.join(', ')}`);
  }

  console.log(`Kanban CSS selectors found in ${cssFiles.length} built CSS file(s): ${requiredFragments.join(', ')}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
