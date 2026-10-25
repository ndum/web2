/**
 * Figures of part 4, components. Writes one SVG per language into site/src/assets/figures/<lang>/.
 * Colours come from classes that site/src/styles/course.css maps to the theme variables of the
 * site, so the inlined figures follow light and dark mode.
 *
 *   node figures/components.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT = {
  de: {
    title: 'Props fliessen von der Eltern- zur Kindkomponente',
    desc:
      'Oben steht die Komponente App mit dem Katalog. Drei Pfeile führen nach unten zu drei Karten der Komponente ItemCard. ' +
      'An jedem Pfeil stehen die Props, die App übergibt, zum Beispiel name gleich Bohrmaschine und category gleich Werkzeug. ' +
      'Jede Karte zeigt nur, was sie bekommen hat. Ein Pfeil zurück nach oben fehlt, die Daten fliessen nur von oben nach unten.',
    parent: 'App.vue',
    parentSub: 'besitzt die Daten',
    cards: [
      ['Bohrmaschine', 'Werkzeug'],
      ['Zelt für vier', 'Camping'],
      ['Raclette-Ofen', 'Küche'],
    ],
    child: 'ItemCard.vue',
    flow: 'Props, nur nach unten',
  },
  en: {
    title: 'Props flow from the parent to the child component',
    desc:
      'At the top is the component App with the catalog. Three arrows lead down to three cards of the component ItemCard. ' +
      'Each arrow carries the props App passes, for example name equals Drill and category equals Tools. ' +
      'Each card shows only what it received. There is no arrow back up, the data flow only downward.',
    parent: 'App.vue',
    parentSub: 'owns the data',
    cards: [
      ['Drill', 'Tools'],
      ['Tent for four', 'Camping'],
      ['Raclette oven', 'Kitchen'],
    ],
    child: 'ItemCard.vue',
    flow: 'props, downward only',
  },
};

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function propsFlow(lang) {
  const t = TEXT[lang];
  const id = `p4c2-flow-${lang}`;
  const width = 680;
  const parent = { x: 250, y: 20, w: 180, h: 64 };
  const cards = t.cards.map((card, i) => ({ x: 20 + i * 225, y: 210, w: 190, h: 86, card }));
  const parts = [];

  parts.push(
    `<rect class="fig-box fig-box-strong" x="${parent.x}" y="${parent.y}" width="${parent.w}" height="${parent.h}" rx="10"/>`,
    `<text class="fig-text" x="${parent.x + parent.w / 2}" y="${parent.y + 28}" text-anchor="middle">${escape(t.parent)}</text>`,
    `<text class="fig-sub" x="${parent.x + parent.w / 2}" y="${parent.y + 50}" text-anchor="middle">${escape(t.parentSub)}</text>`,
  );

  for (const card of cards) {
    const startX = parent.x + parent.w / 2;
    const startY = parent.y + parent.h;
    const endX = card.x + card.w / 2;
    const endY = card.y - 6;
    parts.push(`<path class="fig-arrow" d="M ${startX} ${startY} C ${startX} ${startY + 60}, ${endX} ${endY - 70}, ${endX} ${endY}" marker-end="url(#${id}-head)"/>`);
    const [name, category] = card.card;
    // The labels sit on a patch of page background, so the arrow passes behind them
    const lines = [`name="${name}"`, `category="${category}"`];
    const labelWidth = Math.max(...lines.map((line) => line.length)) * 7.3 + 10;
    parts.push(
      `<rect class="fig-label-bg" x="${endX - labelWidth / 2}" y="${card.y - 52}" width="${labelWidth}" height="36" rx="4"/>`,
      `<text class="fig-code" x="${endX}" y="${card.y - 38}" text-anchor="middle">${escape(lines[0])}</text>`,
      `<text class="fig-code" x="${endX}" y="${card.y - 22}" text-anchor="middle">${escape(lines[1])}</text>`,
      `<rect class="fig-box" x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="10"/>`,
      `<text class="fig-sub" x="${card.x + 12}" y="${card.y + 20}">${escape(t.child)}</text>`,
      `<text class="fig-text" x="${card.x + 12}" y="${card.y + 48}">${escape(name)}</text>`,
      `<text class="fig-sub" x="${card.x + 12}" y="${card.y + 70}">${escape(category)}</text>`,
    );
  }
  parts.push(`<text class="fig-sub fig-note" x="${width - 20}" y="${parent.y + 38}" text-anchor="end">${escape(t.flow)}</text>`);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 316" role="img" aria-labelledby="${id}-title ${id}-desc">`,
    `<title id="${id}-title">${escape(t.title)}</title>`,
    `<desc id="${id}-desc">${escape(t.desc)}</desc>`,
    `<defs><marker id="${id}-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">` +
      `<path class="fig-arrowhead" d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>`,
    ...parts,
    '</svg>',
    '',
  ].join('\n');
}

for (const lang of Object.keys(TEXT)) {
  const target = join(ROOT, 'site', 'src', 'assets', 'figures', lang, 'p4c2-props-flow.svg');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, propsFlow(lang));
}
