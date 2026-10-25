/**
 * Figures of part 7, state and data. Writes one SVG per language into site/src/assets/figures/<lang>/.
 * Colours come from classes that site/src/styles/course.css maps to the theme variables of the
 * site, so the inlined figures follow light and dark mode.
 *
 *   node figures/state.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT = {
  de: {
    decision: {
      title: 'Wohin ein Zustand gehört',
      desc:
        'Ein Entscheidungsbaum mit vier Fragen von oben nach unten. Soll eine Adresse den Wert festhalten, zum Teilen und Neuladen, gehört er in die Adresse, als route.params oder route.query. ' +
        'Liegt er sonst auf dem Server, holt ihn ein Store mit fetch in einer Action. Braucht ihn sonst nur eine Komponente, bleibt er lokal als ref in der Komponente. ' +
        'Brauchen ihn sonst wenige Komponenten mit gemeinsamer Elternkomponente, kommt er in die Elternkomponente und geht mit Props und Events weiter. In allen anderen Fällen gehört er in einen Store mit Pinia.',
      yes: 'ja',
      no: 'nein',
      questions: [
        ['Soll eine Adresse den Wert', 'festhalten, zum Teilen und Neuladen?'],
        ['Liegt der Wert auf dem Server,', 'etwa Katalog und Anfragen?'],
        ['Braucht ihn nur eine Komponente,', 'etwa ein offener Dialog?'],
        ['Brauchen ihn wenige Komponenten', 'mit gemeinsamer Elternkomponente?'],
      ],
      answers: [
        ['In die Adresse', 'route.params, route.query', true],
        ['Ein Store fragt den Server', 'fetch in einer Action', true],
        ['Lokal in der Komponente', 'ref', true],
        ['In die Elternkomponente', 'Props und Events', false],
        ['In einen Store', 'Pinia', false],
      ],
    },
    path: {
      title: 'Der Weg einer Anfrage',
      desc:
        'Eine Folge von oben nach unten. Eine Komponente ruft eine Action des Stores auf, der Store schickt fetch an /api/de/items. Vite auf Port 5173 nimmt die Anfrage an und leitet alles unter /api an die Kurs-API auf Port 3000 weiter, ' +
        'die GET /de/items beantwortet und Rückgaben und Anfragen in storage/state.json festhält. Die Antwort nimmt denselben Weg zurück. ' +
        'Rechts führt ein gestrichelter Weg vom Store direkt an http://localhost:3000. Dieser Weg geht an eine andere Adresse und braucht darum CORS.',
      steps: [
        ['Komponente', 'ruft eine Action auf', false],
        ['Store', "fetch('/api/de/items')", true],
        ['Vite auf Port 5173', 'Proxy, leitet /api weiter', false],
        ['Kurs-API auf Port 3000', 'GET /de/items', true],
        ['storage/state.json', 'Rückgaben und Anfragen', false],
      ],
      direct: ['direkt an localhost:3000', 'nur mit CORS'],
    },
    lifetime: {
      title: 'Wie lange Daten im Browser bleiben',
      desc:
        'Vier Balken über sechs Ereignisse: Seite laden, neu laden, zweiter Tab, Tab schliessen, Browser schliessen und Browser öffnen. ' +
        'Ein Store im Speicher reicht bis zum Neuladen. sessionStorage bleibt beim Neuladen, gehört nur zu diesem Tab und endet, wenn er sich schliesst. ' +
        'Ein Cookie ohne Ablauf gilt für alle Tabs und endet, wenn der Browser schliesst. localStorage gilt für alle Tabs und ist nach dem nächsten Öffnen noch da.',
      events: [
        ['Seite', 'laden'],
        ['neu', 'laden'],
        ['zweiter', 'Tab'],
        ['Tab', 'schliessen'],
        ['Browser', 'schliessen'],
        ['Browser', 'öffnen'],
      ],
      rows: [
        ['Store', 'im Speicher', 1, 'bis zum Neuladen'],
        ['sessionStorage', 'nur dieser Tab', 3, 'bis der Tab schliesst'],
        ['Cookie', 'ohne Ablauf', 4, 'alle Tabs'],
        ['localStorage', 'alle Tabs', 6, 'bleibt'],
      ],
    },
  },
  en: {
    decision: {
      title: 'Where a piece of state belongs',
      desc:
        'A decision tree with four questions from top to bottom. If an address should keep the value, to share and reload, it goes into the address, as route.params or route.query. ' +
        'If it lives on the server instead, a store fetches it in an action. If only one component needs it, it stays local as a ref in the component. ' +
        'If a few components with a common parent need it, it goes into the parent and travels with props and events. In every other case it belongs in a store with Pinia.',
      yes: 'yes',
      no: 'no',
      questions: [
        ['Should an address keep the value,', 'to share and to reload it?'],
        ['Does the value live on the server,', 'such as catalog and requests?'],
        ['Does only one component need it,', 'such as an open dialog?'],
        ['Do a few components need it', 'that share a parent?'],
      ],
      answers: [
        ['Into the address', 'route.params, route.query', true],
        ['A store asks the server', 'fetch in an action', true],
        ['Local in the component', 'ref', true],
        ['Into the parent', 'props and events', false],
        ['Into a store', 'Pinia', false],
      ],
    },
    path: {
      title: 'The path of a request',
      desc:
        'A sequence from top to bottom. A component calls an action of the store, and the store sends fetch to /api/de/items. Vite on port 5173 takes the request and forwards everything below /api to the course API on port 3000, ' +
        'which answers GET /de/items and keeps returns and requests in storage/state.json. The answer takes the same way back. ' +
        'On the right, a dashed path leads from the store directly to http://localhost:3000. That path goes to another origin and therefore needs CORS.',
      steps: [
        ['Component', 'calls an action', false],
        ['Store', "fetch('/api/en/items')", true],
        ['Vite on port 5173', 'proxy, forwards /api', false],
        ['Course API on port 3000', 'GET /en/items', true],
        ['storage/state.json', 'returns and requests', false],
      ],
      direct: ['directly to localhost:3000', 'only with CORS'],
    },
    lifetime: {
      title: 'How long data stays in the browser',
      desc:
        'Four bars across six events: load page, reload, second tab, close tab, close browser and open browser. ' +
        'A store in memory lasts until the reload. sessionStorage survives the reload, belongs to this tab only and ends when it closes. ' +
        'A cookie without expiry applies to all tabs and ends when the browser closes. localStorage applies to all tabs and is still there after the next start.',
      events: [
        ['load', 'page'],
        ['reload', ''],
        ['second', 'tab'],
        ['close', 'tab'],
        ['close', 'browser'],
        ['open', 'browser'],
      ],
      rows: [
        ['Store', 'in memory', 1, 'until the reload'],
        ['sessionStorage', 'this tab only', 3, 'until the tab closes'],
        ['Cookie', 'without expiry', 4, 'all tabs'],
        ['localStorage', 'all tabs', 6, 'stays'],
      ],
    },
  },
};

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg(id, width, height, t, parts) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc">`,
    `<title id="${id}-title">${escape(t.title)}</title>`,
    `<desc id="${id}-desc">${escape(t.desc)}</desc>`,
    `<defs><marker id="${id}-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">` +
      `<path class="fig-arrowhead" d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>`,
    ...parts,
    '</svg>',
    '',
  ].join('\n');
}

const arrow = (id, path, dashed = false) =>
  `<path class="fig-arrow" d="${path}" marker-end="url(#${id}-head)"${dashed ? ' stroke-dasharray="6 5"' : ''}/>`;

function decisionTree(lang) {
  const t = TEXT[lang].decision;
  const id = `p7c1-decision-${lang}`;
  const parts = [];
  const left = 20;
  const qWidth = 300;
  const aLeft = 400;
  const aWidth = 250;
  const height = 56;
  const step = 96;
  const top = 16;
  const answerBox = (x, y, [name, sub, code]) => [
    `<rect class="fig-box fig-box-strong" x="${x}" y="${y}" width="${aWidth}" height="${height}" rx="6"/>`,
    `<text class="fig-text" x="${x + 14}" y="${y + 23}" style="font-size: 14px">${escape(name)}</text>`,
    `<text class="${code ? 'fig-code' : 'fig-sub'}" x="${x + 14}" y="${y + 42}">${escape(sub)}</text>`,
  ];
  t.questions.forEach(([first, second], index) => {
    const y = top + index * step;
    parts.push(
      `<rect class="fig-box" x="${left}" y="${y}" width="${qWidth}" height="${height}" rx="18"/>`,
      `<text class="fig-sub fig-strong" x="${left + 16}" y="${y + 23}" style="font-size: 14px">${escape(first)}</text>`,
      `<text class="fig-sub fig-strong" x="${left + 16}" y="${y + 41}" style="font-size: 14px">${escape(second)}</text>`,
      // Yes leads to the answer on the right
      arrow(id, `M ${left + qWidth + 2} ${y + height / 2} L ${aLeft - 4} ${y + height / 2}`),
      `<text class="fig-sub" x="${(left + qWidth + aLeft) / 2}" y="${y + height / 2 - 8}" text-anchor="middle">${escape(t.yes)}</text>`,
      ...answerBox(aLeft, y, t.answers[index]),
      // No leads to the next question or to the last answer below
      arrow(id, `M ${left + qWidth / 2} ${y + height + 2} L ${left + qWidth / 2} ${y + step - 4}`),
      `<text class="fig-sub" x="${left + qWidth / 2 + 10}" y="${y + height + 25}">${escape(t.no)}</text>`,
    );
  });
  const last = top + t.questions.length * step;
  parts.push(...answerBox(left + (qWidth - aWidth) / 2, last, t.answers[t.answers.length - 1]));
  return svg(id, aLeft + aWidth + 20, last + height + 16, t, parts);
}

function requestPath(lang) {
  const t = TEXT[lang].path;
  const id = `p7c3-path-${lang}`;
  const parts = [];
  const left = 20;
  const width = 280;
  const step = 70;
  const top = 16;
  t.steps.forEach(([name, sub, strong], index) => {
    const y = top + index * step;
    parts.push(
      `<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${left}" y="${y}" width="${width}" height="48" rx="6"/>`,
      `<text class="fig-text" x="${left + 14}" y="${y + 20}" style="font-size: 14px">${escape(name)}</text>`,
      `<text class="${sub.includes('(') || sub.startsWith('GET') ? 'fig-code' : 'fig-sub'}" x="${left + 14}" y="${y + 38}">${escape(sub)}</text>`,
    );
    if (index < t.steps.length - 1) parts.push(arrow(id, `M ${left + width / 2} ${y + 50} L ${left + width / 2} ${y + step - 2}`));
  });
  // The direct way from the store to the API, around the proxy
  const storeY = top + step + 24;
  const apiY = top + 3 * step + 24;
  const side = left + width + 60;
  parts.push(
    arrow(id, `M ${left + width + 2} ${storeY} L ${side} ${storeY} L ${side} ${apiY} L ${left + width + 6} ${apiY}`, true),
    `<text class="fig-sub fig-strong" x="${side + 12}" y="${(storeY + apiY) / 2 - 4}">${escape(t.direct[0])}</text>`,
    `<text class="fig-sub" x="${side + 12}" y="${(storeY + apiY) / 2 + 14}">${escape(t.direct[1])}</text>`,
  );
  return svg(id, side + 230, top + t.steps.length * step - 6, t, parts);
}

function storageLifetime(lang) {
  const t = TEXT[lang].lifetime;
  const id = `p7c4-lifetime-${lang}`;
  const parts = [];
  const labelWidth = 150;
  const column = 84;
  const firstX = 20 + labelWidth + column / 2;
  const eventX = (index) => firstX + index * column;
  const top = 16;
  // The events along the top, with a tick down to the first bar
  t.events.forEach(([first, second], index) => {
    const x = eventX(index);
    parts.push(
      `<text class="fig-sub fig-strong" x="${x}" y="${top + 14}" text-anchor="middle">${escape(first)}</text>`,
      `<text class="fig-sub fig-strong" x="${x}" y="${top + 31}" text-anchor="middle">${escape(second)}</text>`,
      `<path class="fig-arrow" d="M ${x} ${top + 40} L ${x} ${top + 50}"/>`,
    );
  });
  const rowTop = top + 62;
  const rowHeight = 54;
  t.rows.forEach(([name, sub, end, label], index) => {
    const y = rowTop + index * rowHeight;
    const start = eventX(0);
    // A bar that reaches past the last event goes on after the figure ends
    const stop = end >= t.events.length ? eventX(t.events.length - 1) + column / 2 : eventX(end);
    parts.push(
      `<text class="${name.includes('Storage') ? 'fig-code fig-strong' : 'fig-text'}" x="20" y="${y + 17}" style="font-size: 14px">${escape(name)}</text>`,
      `<text class="fig-sub" x="20" y="${y + 34}">${escape(sub)}</text>`,
      `<rect class="fig-box fig-box-strong" x="${start}" y="${y + 4}" width="${stop - start}" height="30" rx="4"/>`,
    );
    // The label goes into the bar when it fits, otherwise right after it
    const inside = label.length * 7.5 + 20 <= stop - start;
    parts.push(`<text class="fig-sub fig-strong" x="${inside ? start + 10 : stop + 8}" y="${y + 24}">${escape(label)}</text>`);
    if (end >= t.events.length) parts.push(arrow(id, `M ${stop} ${y + 19} L ${stop + 26} ${y + 19}`));
  });
  return svg(id, eventX(t.events.length - 1) + column / 2 + 40, rowTop + t.rows.length * rowHeight, t, parts);
}

for (const lang of Object.keys(TEXT)) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'p7c1-state-decision.svg'), decisionTree(lang));
  writeFileSync(join(folder, 'p7c3-request-path.svg'), requestPath(lang));
  writeFileSync(join(folder, 'p7c4-storage-lifetime.svg'), storageLifetime(lang));
}
