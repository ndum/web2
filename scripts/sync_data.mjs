/**
 * Keeps every project on the same catalog of the case. The catalog is written once, in both
 * languages, in api/data/_source/items.json. Every other _source/data/items.json is a copy of it,
 * so a project folder that learners copy out of the repo still has its data.
 *
 *   node scripts/sync_data.mjs           copy the catalog into the projects
 *   node scripts/sync_data.mjs --check   exit 1 when a copy differs
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { sourceFolders } from './localize.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const CATALOG = join(ROOT, 'api', 'data', '_source', 'items.json');

/** Paths of the copies, every items.json in the data folder of a bilingual project */
export function copies() {
  return sourceFolders()
    .map((folder) => join(folder, 'data', 'items.json'))
    .filter((path) => path !== CATALOG && existsSync(path));
}

function main() {
  const check = process.argv.includes('--check');
  const catalog = readFileSync(CATALOG);
  const differing = copies().filter((path) => !readFileSync(path).equals(catalog));
  const shown = differing.map((path) => relative(ROOT, path).split(sep).join('/'));
  if (check) {
    if (shown.length > 0) {
      process.stderr.write(`Copies of the catalog differ, run node scripts/sync_data.mjs:\n${shown.map((path) => `  ${path}`).join('\n')}\n`);
      process.exit(1);
    }
    return;
  }
  for (const path of differing) writeFileSync(path, catalog);
  process.stdout.write(shown.length === 0 ? 'All copies of the catalog are up to date\n' : `${shown.length} copies updated\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
