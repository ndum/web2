/**
 * Figures of part 2, SPA basics. Writes one SVG per language into site/src/assets/figures/<lang>/.
 * Colours come from classes that site/src/styles/course.css maps to the theme variables of the
 * site, so the inlined figures follow light and dark mode.
 *
 *   node figures/spa.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT = {
  de: {
    requests: {
      title: 'Anfragen einer mehrseitigen Website und einer SPA',
      desc:
        'Links eine mehrseitige Website, rechts eine Single Page Application, jeweils in drei Schritten. ' +
        'Beim Öffnen des Katalogs lädt die mehrseitige Website eine ganze Seite, die SPA eine fast leere Seite, ihr JavaScript und die Daten als JSON. ' +
        'Beim Klick auf den Beamer und beim Zurück zum Katalog lädt die mehrseitige Website jedes Mal eine ganze Seite, ' +
        'die SPA schickt keine Anfrage, ihr JavaScript zeigt das Ding und den Katalog selbst an.',
      columns: ['Mehrseitige Website (MPA)', 'Single Page Application (SPA)'],
      steps: ['1. Katalog öffnen', '2. Klick auf den Beamer', '3. Zurück zum Katalog'],
      mpa: [[['GET /katalog', 'ganze Seite']], [['GET /dinge/6', 'ganze Seite']], [['GET /katalog', 'ganze Seite']]],
      spa: [
        [
          ['GET /', 'fast leere Seite'],
          ['GET /main.js', 'JavaScript'],
          ['GET /items', 'Daten als JSON'],
        ],
        'keine Anfrage, JavaScript zeigt das Ding',
        'keine Anfrage, JavaScript zeigt den Katalog',
      ],
    },
    loop: {
      title: 'Der Kreislauf der SPA von Hand',
      desc:
        'Vier Kästchen bilden einen Kreislauf. Der Zustand ist ein Objekt mit status, items und route. ' +
        'Die Funktion render liest den Zustand und schreibt daraus die Seite. Auf der Seite lösen Klicks, Eingaben und hashchange Events aus. ' +
        'Die Handler der Events ändern den Zustand, und der Kreislauf beginnt von vorn. Die Handler ändern die Seite nie direkt.',
      state: ['Zustand', '{ status, items, route }'],
      render: ['render()', 'baut HTML aus dem Zustand'],
      page: ['Seite', 'das DOM im Browser'],
      event: ['Event', 'Klick, Eingabe, hashchange'],
      reads: 'liest',
      writes: 'schreibt',
      fires: 'löst aus',
      changes: 'ändert',
      note: 'Die Handler ändern nur den Zustand, nie direkt die Seite.',
    },
  },
  en: {
    requests: {
      title: 'Requests of a multi-page website and of an SPA',
      desc:
        'On the left a multi-page website, on the right a single page application, each in three steps. ' +
        'When the catalog opens, the multi-page website loads a whole page, the SPA an almost empty page, its JavaScript and the data as JSON. ' +
        'On a click on the projector and on going back to the catalog, the multi-page website loads a whole page each time, ' +
        'while the SPA sends no request and its JavaScript shows the thing and the catalog by itself.',
      columns: ['Multi-page website (MPA)', 'Single page application (SPA)'],
      steps: ['1. Open the catalog', '2. Click the projector', '3. Back to the catalog'],
      mpa: [[['GET /catalog', 'whole page']], [['GET /things/6', 'whole page']], [['GET /catalog', 'whole page']]],
      spa: [
        [
          ['GET /', 'almost empty page'],
          ['GET /main.js', 'JavaScript'],
          ['GET /items', 'data as JSON'],
        ],
        'no request, JavaScript shows the thing',
        'no request, JavaScript shows the catalog',
      ],
    },
    loop: {
      title: 'The cycle of the SPA by hand',
      desc:
        'Four boxes form a cycle. The state is an object with status, items and route. ' +
        'The function render reads the state and writes the page from it. On the page, clicks, input and hashchange fire events. ' +
        'The event handlers change the state, and the cycle starts again. The handlers never change the page directly.',
      state: ['State', '{ status, items, route }'],
      render: ['render()', 'builds HTML from the state'],
      page: ['Page', 'the DOM in the browser'],
      event: ['Event', 'click, input, hashchange'],
      reads: 'reads',
      writes: 'writes',
      fires: 'fires',
      changes: 'changes',
      note: 'The handlers change only the state, never the page directly.',
    },
  },
};

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const marker = (id) =>
  `<defs><marker id="${id}-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">` +
  `<path class="fig-arrowhead" d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>`;

function svg(id, width, height, t, parts) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc">`,
    `<title id="${id}-title">${escape(t.title)}</title>`,
    `<desc id="${id}-desc">${escape(t.desc)}</desc>`,
    marker(id),
    ...parts,
    '</svg>',
    '',
  ].join('\n');
}

// A label on a patch of page background, so an arrow can pass behind it
function label(x, y, text) {
  const width = text.length * 6.6 + 10;
  return [
    `<rect class="fig-label-bg" x="${x - width / 2}" y="${y - 13}" width="${width}" height="18" rx="3"/>`,
    `<text class="fig-sub" x="${x}" y="${y}" text-anchor="middle">${escape(text)}</text>`,
  ];
}

function requests(lang) {
  const t = TEXT[lang].requests;
  const id = `p2c1-requests-${lang}`;
  const columns = [20, 350];
  const parts = t.columns.map((name, index) => `<text class="fig-text" x="${columns[index]}" y="28">${escape(name)}</text>`);
  // Every step starts at the same height in both columns, the tallest column sets it
  const heights = t.mpa.map((mpaStep, index) => 26 + Math.max(mpaStep.length, Array.isArray(t.spa[index]) ? t.spa[index].length : 1) * 34);
  let y = 52;
  t.steps.forEach((step, index) => {
    columns.forEach((x, column) => {
      parts.push(`<text class="fig-sub" x="${x}" y="${y + 12}">${escape(step)}</text>`);
      const content = column === 0 ? t.mpa[index] : t.spa[index];
      if (typeof content === 'string') {
        parts.push(
          `<rect class="fig-box" x="${x}" y="${y + 22}" width="300" height="26" rx="6" stroke-dasharray="5 4"/>`,
          `<text class="fig-sub fig-note" x="${x + 10}" y="${y + 39}">${escape(content)}</text>`,
        );
        return;
      }
      content.forEach(([request, answer], row) => {
        const top = y + 22 + row * 34;
        parts.push(
          `<rect class="fig-box fig-box-strong" x="${x}" y="${top}" width="130" height="26" rx="6"/>`,
          `<text class="fig-code" x="${x + 10}" y="${top + 17}">${escape(request)}</text>`,
          `<path class="fig-arrow" d="M ${x + 134} ${top + 13} L ${x + 160} ${top + 13}" marker-end="url(#${id}-head)"/>`,
          `<text class="fig-sub" x="${x + 168}" y="${top + 17}">${escape(answer)}</text>`,
        );
      });
    });
    y += heights[index] + 14;
  });
  return svg(id, 680, y, t, parts);
}

function renderLoop(lang) {
  const t = TEXT[lang].loop;
  const id = `p2c2-loop-${lang}`;
  const boxes = [
    { x: 60, y: 40, content: t.state, strong: true },
    { x: 420, y: 40, content: t.render },
    { x: 420, y: 200, content: t.page },
    { x: 60, y: 200, content: t.event },
  ];
  const parts = [];
  for (const box of boxes) {
    const [name, sub] = box.content;
    parts.push(
      `<rect class="fig-box${box.strong ? ' fig-box-strong' : ''}" x="${box.x}" y="${box.y}" width="200" height="64" rx="10"/>`,
      `<text class="fig-text" x="${box.x + 100}" y="${box.y + 28}" text-anchor="middle">${escape(name)}</text>`,
      `<text class="${box === boxes[0] ? 'fig-code' : 'fig-sub'}" x="${box.x + 100}" y="${box.y + 50}" text-anchor="middle">${escape(sub)}</text>`,
    );
  }
  parts.push(
    `<path class="fig-arrow" d="M 262 72 L 416 72" marker-end="url(#${id}-head)"/>`,
    ...label(340, 66, t.reads),
    `<path class="fig-arrow" d="M 520 106 L 520 196" marker-end="url(#${id}-head)"/>`,
    ...label(520, 156, t.writes),
    `<path class="fig-arrow" d="M 418 232 L 264 232" marker-end="url(#${id}-head)"/>`,
    ...label(340, 226, t.fires),
    `<path class="fig-arrow" d="M 160 198 L 160 108" marker-end="url(#${id}-head)"/>`,
    ...label(160, 156, t.changes),
    `<text class="fig-sub fig-note" x="340" y="296" text-anchor="middle">${escape(t.note)}</text>`,
  );
  return svg(id, 680, 310, t, parts);
}

for (const lang of Object.keys(TEXT)) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'p2c1-requests.svg'), requests(lang));
  writeFileSync(join(folder, 'p2c2-render-loop.svg'), renderLoop(lang));
}
