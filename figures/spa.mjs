/**
 * Figures of part 2, SPA basics. Writes one SVG per language into site/src/assets/figures/<lang>/.
 *
 *   node figures/spa.mjs
 */
import { arrow, badge, band, figure, fitted, heading, label, placeholder, save, strip, tile, WIDTH } from './diagram.mjs';

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
      steps: ['Katalog öffnen', 'Klick auf den Beamer', 'Zurück zum Katalog'],
      mpa: [[['Ganze Seite', 'GET /katalog']], [['Ganze Seite', 'GET /dinge/6']], [['Ganze Seite', 'GET /katalog']]],
      spa: [
        [
          ['Fast leere Seite', 'GET /'],
          ['JavaScript', 'GET /main.js'],
          ['Daten als JSON', 'GET /items'],
        ],
        'keine Anfrage, JavaScript zeigt das Ding',
        'keine Anfrage, JavaScript zeigt den Katalog',
      ],
    },
    loop: {
      title: 'Der Kreislauf der SPA von Hand',
      desc:
        'Vier Karten bilden einen Kreislauf. Der Zustand ist ein Objekt mit status, items und route. ' +
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
      steps: ['Open the catalog', 'Click the projector', 'Back to the catalog'],
      mpa: [[['Whole page', 'GET /catalog']], [['Whole page', 'GET /things/6']], [['Whole page', 'GET /catalog']]],
      spa: [
        [
          ['Almost empty page', 'GET /'],
          ['JavaScript', 'GET /main.js'],
          ['Data as JSON', 'GET /items'],
        ],
        'no request, JavaScript shows the thing',
        'no request, JavaScript shows the catalog',
      ],
    },
    loop: {
      title: 'The cycle of the SPA by hand',
      desc:
        'Four cards form a cycle. The state is an object with status, items and route. ' +
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

// What the first requests of the SPA bring back, a page, its JavaScript and the data
const ANSWER_ICONS = ['doc', 'code', 'list'];

const CARD_H = 44;
const CARD_GAP = 8;
const STEP_HEAD = 26;
const STEP_GAP = 16;

function requests(lang) {
  const t = TEXT[lang].requests;
  const id = `p2c1-requests-${lang}`;
  const columns = [16, 348].map((x) => ({ x, w: 316 }));
  const cards = (step) => Math.max(t.mpa[step].length, Array.isArray(t.spa[step]) ? t.spa[step].length : 1);
  // Every step starts at the same height in both columns, the column with more cards sets it
  const tops = [];
  let y = 56;
  t.steps.forEach((_, step) => {
    tops.push(y);
    y += STEP_HEAD + cards(step) * CARD_H + (cards(step) - 1) * CARD_GAP + STEP_GAP;
  });
  const bottom = y - STEP_GAP + 16;
  const body = [];
  columns.forEach((c, column) => {
    body.push(band(c.x, 16, c.w, bottom - 16, column + 1));
    body.push(label(c.x + 16, 40, t.columns[column], 'start', column ? { tone: 'blue' } : {}));
  });
  t.steps.forEach((step, index) => {
    columns.forEach((c, column) => {
      const top = tops[index];
      body.push(badge(c.x + 26, top + 8, String(index + 1), { accent: column === 1 && index === 0 }), heading(c.x + 44, top + 12, step));
      const content = column === 0 ? t.mpa[index] : t.spa[index];
      if (typeof content === 'string') {
        body.push(placeholder(c.x + 16, top + STEP_HEAD, c.w - 32, CARD_H, content));
        return;
      }
      content.forEach(([answer, request], row) => {
        const icon = column === 0 ? 'doc' : ANSWER_ICONS[row];
        body.push(tile(c.x + 16, top + STEP_HEAD + row * (CARD_H + CARD_GAP), c.w - 32, CARD_H, answer, request, { code: true, icon }));
      });
    });
  });
  return figure({ id, width: WIDTH, height: bottom + 16, title: t.title, desc: t.desc, body });
}

function renderLoop(lang) {
  const t = TEXT[lang].loop;
  const id = `p2c2-loop-${lang}`;
  const w = 220;
  const h = 56;
  const left = 56;
  const right = WIDTH - 56 - w;
  const top = 32;
  const lower = 176;
  // The four corners of the cycle, the arrows run clockwise between them
  const body = [
    arrow(id, [[left + w, top + h / 2], [right - 4, top + h / 2]]),
    fitted(WIDTH / 2, top + h / 2 - 8, t.reads, right - left - w - 16, 'middle'),
    arrow(id, [[right + w / 2, top + h + 1.5], [right + w / 2, lower - 4]]),
    fitted(right + w / 2 + 10, (top + h + lower) / 2 + 4, t.writes, 100),
    arrow(id, [[right, lower + h / 2], [left + w + 4, lower + h / 2]]),
    fitted(WIDTH / 2, lower + h / 2 - 8, t.fires, right - left - w - 16, 'middle'),
    // The handlers change the state, the one way the page changes
    arrow(id, [[left + w / 2, lower], [left + w / 2, top + h + 5.5]], { accent: true }),
    fitted(left + w / 2 + 10, (top + h + lower) / 2 + 4, t.changes, 100),
    tile(left, top, w, h, ...t.state, { accent: true, code: true, icon: 'database' }),
    tile(right, top, w, h, ...t.render, { icon: 'code' }),
    tile(right, lower, w, h, ...t.page, { icon: 'browser' }),
    tile(left, lower, w, h, ...t.event, { icon: 'bolt' }),
    strip(left, lower + h + 28, WIDTH - 2 * left, 30, t.note),
  ];
  return figure({ id, width: WIDTH, height: lower + h + 28 + 30 + 20, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) {
  save(lang, 'p2c1-requests', requests(lang));
  save(lang, 'p2c2-render-loop', renderLoop(lang));
}
