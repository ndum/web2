/**
 * Figures of part 7, state and data. Writes one SVG per language into site/src/assets/figures/<lang>/.
 *
 *   node figures/state.mjs
 */
import { arrow, badge, band, figure, fitted, heading, label, labelWidth, meta, room, save, SIZE, strip, tile, WIDTH } from './diagram.mjs';

const TEXT = {
  de: {
    decision: {
      title: 'Wohin ein Zustand gehört',
      desc:
        'Ein Entscheidungsbaum mit vier nummerierten Fragen links von oben nach unten und den Orten für den Zustand rechts. ' +
        'Ein Ja führt zum Ort rechts, ein Nein zur nächsten Frage. ' +
        'Soll eine Adresse den Wert festhalten, zum Teilen und Neuladen, gehört er in die Adresse, als route.params oder route.query. ' +
        'Liegt er sonst auf dem Server, holt ihn ein Store mit fetch in einer Action. ' +
        'Braucht ihn sonst nur eine Komponente, bleibt er lokal als ref in der Komponente. ' +
        'Brauchen ihn sonst wenige Komponenten mit gemeinsamer Elternkomponente, kommt er in die Elternkomponente ' +
        'und geht mit Props und Events weiter. In allen anderen Fällen gehört er in einen Store mit Pinia.',
      asks: 'Fragen der Reihe nach',
      places: 'Ort des Zustands',
      yes: 'ja',
      no: 'nein',
      questions: [
        ['Soll eine Adresse den Wert festhalten?', 'zum Teilen und Neuladen'],
        ['Liegt der Wert auf dem Server?', 'etwa Katalog und Anfragen'],
        ['Braucht ihn nur eine Komponente?', 'etwa ein offener Dialog'],
        ['Brauchen ihn wenige Komponenten?', 'mit gemeinsamer Elternkomponente'],
      ],
      answers: [
        ['In die Adresse', 'route.params, route.query', true],
        ['Ein Store fragt den Server', 'fetch in einer Action', false],
        ['Lokal in der Komponente', 'ref', true],
        ['In die Elternkomponente', 'Props und Events', false],
        ['In einen Store', 'Pinia', false],
      ],
    },
    path: {
      title: 'Der Weg einer Anfrage',
      desc:
        'Drei Bereiche von oben nach unten zeigen den Browser mit der Seite von localhost:5173, Vite auf Port 5173 ' +
        'und die Kurs-API auf Port 3000. Im Browser ruft eine Komponente eine Action des Stores auf, und der Store schickt fetch ' +
        'an /api/de/items. Der Proxy von Vite nimmt die Anfrage an und leitet alles unter /api an die Kurs-API weiter. ' +
        'Die API beantwortet GET /de/items mit dem Katalog und hält Rückgaben und Anfragen in storage/state.json fest. ' +
        'Die Antwort nimmt denselben Weg zurück. ' +
        'Rechts führt ein gestrichelter Pfeil vom Store an Vite vorbei direkt an localhost:3000. ' +
        'Dieser Weg geht an eine andere Adresse und braucht darum CORS.',
      browser: 'Im Browser',
      page: 'Seite von localhost:5173',
      vite: 'Vite auf Port 5173',
      api: 'Kurs-API auf Port 3000',
      component: ['Komponente', 'ruft eine Action auf'],
      store: ['Store', "fetch('/api/de/items')"],
      proxy: ['Proxy', 'leitet /api weiter'],
      route: ['Katalog', 'GET /de/items'],
      file: ['storage/state.json', 'Rückgaben und Anfragen'],
      direct: ['direkt an localhost:3000', 'nur mit CORS'],
      back: 'Die Antwort nimmt denselben Weg zurück.',
    },
    lifetime: {
      title: 'Wie lange Daten im Browser bleiben',
      desc:
        'Vier Balken über einem Zeitstrahl mit sechs nummerierten Ereignissen, Seite laden, neu laden, zweiter Tab, Tab schliessen, ' +
        'Browser schliessen und Browser öffnen. Ein Store im Speicher reicht bis zum Neuladen. ' +
        'sessionStorage bleibt beim Neuladen, gehört nur zu diesem Tab und endet, wenn er sich schliesst. ' +
        'Ein Cookie ohne Ablauf gilt für alle Tabs und endet, wenn der Browser schliesst. ' +
        'localStorage gilt für alle Tabs und ist nach dem nächsten Öffnen noch da.',
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
        ['Cookie', 'ohne Ablauf, alle Tabs', 4, 'bis der Browser schliesst'],
        ['localStorage', 'alle Tabs', 6, 'bleibt'],
      ],
    },
  },
  en: {
    decision: {
      title: 'Where a piece of state belongs',
      desc:
        'A decision tree with four numbered questions on the left from top to bottom and the places for the state on the right. ' +
        'A yes leads to the place on the right, a no to the next question. ' +
        'If an address should keep the value, to share and reload, it goes into the address, as route.params or route.query. ' +
        'If it lives on the server instead, a store fetches it in an action. ' +
        'If only one component needs it, it stays local as a ref in the component. ' +
        'If a few components with a common parent need it, it goes into the parent and travels with props and events. ' +
        'In every other case it belongs in a store with Pinia.',
      asks: 'Questions in order',
      places: 'Where the state goes',
      yes: 'yes',
      no: 'no',
      questions: [
        ['Should an address keep the value?', 'to share and to reload it'],
        ['Does the value live on the server?', 'such as catalog and requests'],
        ['Does only one component need it?', 'such as an open dialog'],
        ['Do a few components need it?', 'that share a parent'],
      ],
      answers: [
        ['Into the address', 'route.params, route.query', true],
        ['A store asks the server', 'fetch in an action', false],
        ['Local in the component', 'ref', true],
        ['Into the parent', 'props and events', false],
        ['Into a store', 'Pinia', false],
      ],
    },
    path: {
      title: 'The path of a request',
      desc:
        'Three areas from top to bottom show the browser with the page from localhost:5173, Vite on port 5173 ' +
        'and the course API on port 3000. In the browser, a component calls an action of the store, and the store sends fetch ' +
        'to /api/en/items. The proxy of Vite takes the request and forwards everything below /api to the course API. ' +
        'The API answers GET /en/items with the catalog and keeps returns and requests in storage/state.json. ' +
        'The answer takes the same way back. On the right, a dashed arrow leads from the store past Vite directly to localhost:3000. ' +
        'That path goes to another origin and therefore needs CORS.',
      browser: 'In the browser',
      page: 'page from localhost:5173',
      vite: 'Vite on port 5173',
      api: 'Course API on port 3000',
      component: ['Component', 'calls an action'],
      store: ['Store', "fetch('/api/en/items')"],
      proxy: ['Proxy', 'forwards /api'],
      route: ['Catalog', 'GET /en/items'],
      file: ['storage/state.json', 'returns and requests'],
      direct: ['directly to localhost:3000', 'only with CORS'],
      back: 'The answer takes the same way back.',
    },
    lifetime: {
      title: 'How long data stays in the browser',
      desc:
        'Four bars above a timeline with six numbered events, load page, reload, second tab, close tab, close browser ' +
        'and open browser. A store in memory lasts until the reload. ' +
        'sessionStorage survives the reload, belongs to this tab only and ends when it closes. ' +
        'A cookie without expiry applies to all tabs and ends when the browser closes. ' +
        'localStorage applies to all tabs and is still there after the next start.',
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
        ['Cookie', 'without expiry, all tabs', 4, 'until the browser closes'],
        ['localStorage', 'all tabs', 6, 'stays'],
      ],
    },
  },
};

const CARD_H = 48;

// What holds the value at each place, the route, the server, one component, a parent with its children and the store
const ANSWER_ICONS = ['signpost', 'server', 'block', 'network', 'database'];

function decisionTree(lang) {
  const t = TEXT[lang].decision;
  const id = `p7c1-decision-${lang}`;
  // The badges with the order of the questions stand left of the question cards
  const ask = { x: 60, w: 276 };
  const place = { x: 400, w: 248 };
  const step = 84;
  const top = (row) => 56 + row * step;
  const askMid = ask.x + ask.w / 2;
  const last = t.questions.length;
  const bottom = top(last) + CARD_H + 16;
  const body = [
    band(16, 16, 336, bottom - 16, 1),
    label(32, 40, t.asks),
    band(384, 16, 280, bottom - 16, 2),
    label(400, 40, t.places, 'start', { tone: 'blue' }),
  ];
  t.questions.forEach((_, row) => {
    const y = top(row);
    const mid = y + CARD_H / 2;
    body.push(
      arrow(id, [[ask.x + ask.w, mid], [place.x - 4, mid]]),
      fitted((ask.x + ask.w + place.x) / 2, mid - 8, t.yes, place.x - ask.x - ask.w - 16, 'middle'),
    );
    // No leads to the next question, after the last one to the store at the foot of the places
    const end = top(last) + CARD_H / 2;
    const rest = row + 1 < last ? [[askMid, top(row + 1) - 4]] : [[askMid, end], [place.x - 4, end]];
    body.push(arrow(id, [[askMid, y + CARD_H + 1.5], ...rest]), fitted(askMid + 10, y + CARD_H + 22, t.no, ask.x + ask.w - askMid - 10));
  });
  t.questions.forEach(([question, example], row) => {
    body.push(badge(42, top(row) + CARD_H / 2, String(row + 1)), tile(ask.x, top(row), ask.w, CARD_H, question, example));
  });
  t.answers.forEach(([where, how, code], row) => {
    body.push(tile(place.x, top(row), place.w, CARD_H, where, how, { code, icon: ANSWER_ICONS[row] }));
  });
  return figure({ id, width: WIDTH, height: bottom + 16, title: t.title, desc: t.desc, body });
}

function requestPath(lang) {
  const t = TEXT[lang].path;
  const id = `p7c3-path-${lang}`;
  // The browser on top, Vite in the middle and the API at the foot, the path turns at the store and at the API
  const left = { x: 32, w: 180 };
  const main = { x: 252, w: 200 };
  const rows = [56, 176, 296];
  const mid = main.x + main.w / 2;
  const level = (row) => rows[row] + CARD_H / 2;
  // The band of Vite ends before the direct way, which passes it on the outside
  const viteRight = main.x + main.w + 16;
  const side = viteRight + 24;
  const pageX = 32 + labelWidth(t.browser) + 10;
  room(t.page, WIDTH - 32 - pageX);
  const back = 376;
  const body = [
    band(16, 16, WIDTH - 32, 104, 2),
    label(32, 40, t.browser, 'start', { tone: 'blue' }),
    meta(pageX, 40, t.page),
    band(16, 136, viteRight - 16, 104, 1),
    label(32, 160, t.vite),
    band(16, 256, WIDTH - 32, 104, 3),
    label(32, 280, t.api, 'start', { tone: 'violet' }),
    arrow(id, [[left.x + left.w, level(0)], [main.x - 4, level(0)]]),
    arrow(id, [[mid, rows[0] + CARD_H + 1.5], [mid, rows[1] - 4]]),
    arrow(id, [[mid, rows[1] + CARD_H + 1.5], [mid, rows[2] - 4]]),
    arrow(id, [[main.x, level(2)], [left.x + left.w + 4, level(2)]]),
    arrow(id, [[main.x + main.w, level(0)], [side, level(0)], [side, level(2)], [main.x + main.w + 4, level(2)]], { dashed: true }),
    fitted(side + 10, level(1) - 4, t.direct[0], WIDTH - 32 - side - 10),
    fitted(side + 10, level(1) + 12, t.direct[1], WIDTH - 32 - side - 10),
    tile(left.x, rows[0], left.w, CARD_H, ...t.component, { icon: 'block' }),
    tile(main.x, rows[0], main.w, CARD_H, ...t.store, { code: true, icon: 'database' }),
    // The proxy is why the browser sees app and API on one origin
    tile(main.x, rows[1], main.w, CARD_H, ...t.proxy, { accent: true, icon: 'server' }),
    tile(main.x, rows[2], main.w, CARD_H, ...t.route, { code: true, icon: 'list' }),
    tile(left.x, rows[2], left.w, CARD_H, ...t.file, { icon: 'doc' }),
    strip(16, back, WIDTH - 32, 30, t.back),
  ];
  return figure({ id, width: WIDTH, height: back + 30 + 16, title: t.title, desc: t.desc, body });
}

/** A bar of the chart, an open bar ends in a point because its data outlives the last event */
function bar(x, y, w, h, open = false) {
  if (!open) return `<rect class="d-fill-blue" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
  const r = 4;
  const tip = h / 2 + 2;
  return (
    `<path class="d-fill-blue" d="M ${x + r} ${y} H ${x + w - tip} L ${x + w} ${y + h / 2} L ${x + w - tip} ${y + h} H ${x + r} ` +
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z"/>`
  );
}

function storageLifetime(lang) {
  const t = TEXT[lang].lifetime;
  const id = `p7c4-lifetime-${lang}`;
  const spacing = 72;
  const at = (event) => 180 + event * spacing;
  const rowTop = (row) => 16 + row * 48;
  const axis = rowTop(t.rows.length) + 20;
  const lastEvent = t.events.length - 1;
  const openEnd = at(lastEvent) + 44;
  const body = [];
  // A dashed line drops from the end of each bar to its event, the bars below cover it, so it never meets a label
  t.rows.forEach(([, , end], row) => {
    if (end <= lastEvent) body.push(`<path class="d-grid" d="M ${at(end)} ${rowTop(row) + 27} V ${axis - 13}"/>`);
  });
  body.push(`<path class="d-axis" d="M ${at(0)} ${axis} H ${openEnd}"/>`);
  t.rows.forEach(([name, kind, end, until], row) => {
    const y = rowTop(row);
    const open = end > lastEvent;
    const stop = open ? openEnd : at(end);
    room(name, at(0) - 36, { size: SIZE.small, bold: true });
    body.push(
      heading(16, y + 16, name),
      fitted(16, y + 31, kind, at(0) - 36),
      bar(at(0), y + 11, stop - at(0), 16, open),
      fitted(stop + 8, y + 23, until, WIDTH - 16 - stop - 8),
    );
  });
  t.events.forEach((lines, event) => {
    body.push(badge(at(event), axis, String(event + 1)));
    lines.filter(Boolean).forEach((line, index) => body.push(fitted(at(event), axis + 26 + index * 14, line, spacing - 8, 'middle')));
  });
  return figure({ id, width: WIDTH, height: axis + 60, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) {
  save(lang, 'p7c1-state-decision', decisionTree(lang));
  save(lang, 'p7c3-request-path', requestPath(lang));
  save(lang, 'p7c4-storage-lifetime', storageLifetime(lang));
}
