/**
 * Figures of the JS workshop, one per unit. Every module in figures/workshop/ draws the figure of
 * one unit and exports its file name and a function that draws it in one language, so the units
 * can get their figures one at a time. Writes one SVG per language into site/src/assets/figures/<lang>/.
 *
 *   node figures/workshop.mjs
 */
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { save } from './diagram.mjs';

const FOLDER = join(dirname(fileURLToPath(import.meta.url)), 'workshop');
const units = readdirSync(FOLDER)
  .filter((file) => /^j\d+\.mjs$/.test(file))
  .sort((a, b) => Number.parseInt(a.slice(1), 10) - Number.parseInt(b.slice(1), 10));

for (const file of units) {
  const unit = await import(pathToFileURL(join(FOLDER, file)).href);
  for (const lang of ['de', 'en']) save(lang, unit.name, unit.draw(lang));
}
