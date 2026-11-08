/**
 * Figures of part 8, architecture, quality and operations. Writes one SVG per language into
 * site/src/assets/figures/<lang>/.
 *
 *   node figures/architecture.mjs
 */
import {
  arrow,
  band,
  figure,
  fitted,
  icon,
  label,
  measure,
  mixed,
  mixedWidth,
  placeholder,
  save,
  SIZE,
  strip,
  tile,
  WIDTH,
} from './diagram.mjs';

const TEXT = {
  de: {
    folders: {
      title: 'Ordner nach Art und nach Feature',
      desc:
        'Zwei Ordnerbäume nebeneinander. Links ist die App nach Art der Dateien geordnet, in views, components, stores ' +
        'und composables, und die vier markierten Dateien der Anfragen liegen in vier verschiedenen Ordnern. ' +
        'Rechts hat jedes Feature einen Ordner unter features, catalog und reservations mit ihren Seiten, Komponenten, Stores ' +
        'und Routen. Die Dateien der Anfragen liegen dort beisammen im Ordner reservations. ' +
        'Gemeinsame Bausteine stehen in components, die Schicht für die API in api.',
      left: 'Nach Art der Dateien',
      right: 'Nach Feature',
      marked: 'Dateien der Anfragen',
    },
    layers: {
      title: 'Die Schichten der App',
      desc:
        'Vier Ebenen von oben nach unten, die Pfeile zeigen, wer wen importiert. ' +
        'Ein Bereich fasst die drei Schichten der App zusammen, der Server liegt darunter ausserhalb. ' +
        'Zuoberst setzen main.js, App.vue und der Router die App zusammen und importieren die Features. ' +
        'Die Features enthalten Seiten, eigene Komponenten und Stores und importieren gemeinsame Bausteine und die Schicht für die API. ' +
        'Gemeinsame Bausteine in components, composables und utils kennen kein Feature. ' +
        'Nur die Schicht für die API in src/api spricht mit fetch mit dem Server. Kein Pfeil zeigt nach oben.',
      group: 'Schichten der App',
      boxes: {
        app: ['App und Router', 'main.js, App.vue, router'],
        features: ['Features', 'Seiten, eigene Komponenten, Stores'],
        shared: ['Gemeinsame Bausteine', 'components, composables, utils'],
        api: ['Schicht für die API', 'src/api'],
        server: ['Server', 'Kurs-API oder Attrappe'],
      },
      imports: 'importiert',
      fetch: 'fetch',
      note: 'Kein Pfeil zeigt nach oben.',
    },
    status: {
      title: 'Der Status eines Architekturentscheids',
      desc:
        'Ein Zustandsdiagramm mit den drei Spalten Beginn, Entscheid und Später. ' +
        'Ein Entscheid beginnt als vorgeschlagen und wird angenommen oder abgelehnt. ' +
        'Ein angenommener Entscheid kann später veralten oder durch einen neuen Entscheid ersetzt werden, der auf ihn verweist. ' +
        'Gelöscht wird kein Entscheid, er behält seine Nummer und bleibt im Verzeichnis.',
      stages: ['Beginn', 'Entscheid', 'Später'],
      states: {
        proposed: 'Vorgeschlagen',
        accepted: 'Angenommen',
        rejected: 'Abgelehnt',
        deprecated: 'Veraltet',
        superseded: 'Ersetzt durch ADR n',
      },
      note: 'Kein Entscheid wird gelöscht, die Nummer bleibt.',
    },
    deploy: {
      title: 'Vom Push zur veröffentlichten App',
      desc:
        'Ein Ablauf von oben nach unten in zwei Bereichen, GitHub Actions und GitHub Pages. ' +
        'Ein Push auf main startet einen Workflow, der die Pakete mit npm ci installiert, die Tests mit npm test ausführt ' +
        'und mit npm run build baut. Schlägt ein Test fehl, endet der Workflow, und nichts geht online. ' +
        'Der Ordner dist geht als Artefakt an GitHub Pages, das die App unter name.github.io/lorraine-commons/ ausliefert. ' +
        'Rechts zweigt eine Adresse ab, die GitHub Pages nicht kennt, etwa /lorraine-commons/items/6. ' +
        'Dafür liefert Pages die Datei 404.html, eine Kopie von index.html, und der Router zeigt die Seite des Dings.',
      push: ['Push auf main', 'git push'],
      starts: 'startet',
      actions: 'GitHub Actions',
      workflow: ['Workflow', 'npm ci, npm test, npm run build'],
      fail: 'Test schlägt fehl, nichts geht online',
      artifact: [
        ['Ordner ', false],
        ['dist', true],
        [' als Artefakt', false],
      ],
      pages: 'GitHub Pages',
      site: ['Veröffentlichte App', 'name.github.io/lorraine-commons/'],
      unknown: ['Unbekannte Adresse', '/lorraine-commons/items/6'],
      serves: 'Pages liefert',
      fallback: ['404.html', 'Kopie von index.html, der Router zeigt die Seite'],
    },
  },
  en: {
    folders: {
      title: 'Folders by kind and by feature',
      desc:
        'Two folder trees side by side. On the left the app is sorted by the kind of file, in views, components, stores ' +
        'and composables, and the four marked files of the requests sit in four different folders. ' +
        'On the right every feature has a folder below features, catalog and reservations with their pages, components, stores ' +
        'and routes. The files of the requests sit together there in the folder reservations. ' +
        'Shared building blocks live in components, the layer for the API in api.',
      left: 'By kind of file',
      right: 'By feature',
      marked: 'files of the requests',
    },
    layers: {
      title: 'The layers of the app',
      desc:
        'Four levels from top to bottom, the arrows show who imports whom. ' +
        'An area groups the three layers of the app, and the server sits below it outside the app. ' +
        'At the top, main.js, App.vue and the router put the app together and import the features. ' +
        'The features hold pages, their own components and stores, and they import shared building blocks and the layer for the API. ' +
        'Shared building blocks in components, composables and utils know no feature. ' +
        'Only the layer for the API in src/api talks to the server with fetch. No arrow points upwards.',
      group: 'Layers of the app',
      boxes: {
        app: ['App and router', 'main.js, App.vue, router'],
        features: ['Features', 'pages, own components, stores'],
        shared: ['Shared building blocks', 'components, composables, utils'],
        api: ['Layer for the API', 'src/api'],
        server: ['Server', 'course API or stand-in'],
      },
      imports: 'imports',
      fetch: 'fetch',
      note: 'No arrow points upwards.',
    },
    status: {
      title: 'The status of an architecture decision',
      desc:
        'A state diagram with the three columns Start, Decision and Later. ' +
        'A decision starts as proposed and is accepted or rejected. ' +
        'An accepted decision can later become deprecated or be superseded by a new decision that points to it. ' +
        'No decision is deleted, it keeps its number and stays in the index.',
      stages: ['Start', 'Decision', 'Later'],
      states: {
        proposed: 'Proposed',
        accepted: 'Accepted',
        rejected: 'Rejected',
        deprecated: 'Deprecated',
        superseded: 'Superseded by ADR n',
      },
      note: 'No decision is deleted, the number stays.',
    },
    deploy: {
      title: 'From a push to the published app',
      desc:
        'A flow from top to bottom in two areas, GitHub Actions and GitHub Pages. ' +
        'A push to main starts a workflow that installs the packages with npm ci, runs the tests with npm test ' +
        'and builds with npm run build. If a test fails, the workflow ends and nothing goes online. ' +
        'The folder dist goes to GitHub Pages as an artifact, and Pages serves the app at name.github.io/lorraine-commons/. ' +
        'On the right, an address that GitHub Pages does not know branches off, such as /lorraine-commons/items/6. ' +
        'For it, Pages serves the file 404.html, a copy of index.html, and the router shows the page of the thing.',
      push: ['Push to main', 'git push'],
      starts: 'starts',
      actions: 'GitHub Actions',
      workflow: ['Workflow', 'npm ci, npm test, npm run build'],
      fail: 'A test fails, nothing goes online',
      artifact: [
        ['folder ', false],
        ['dist', true],
        [' as an artifact', false],
      ],
      pages: 'GitHub Pages',
      site: ['Published app', 'name.github.io/lorraine-commons/'],
      unknown: ['Unknown address', '/lorraine-commons/items/6'],
      serves: 'Pages serves',
      fallback: ['404.html', 'copy of index.html, the router shows the page'],
    },
  },
};

const CARD_H = 48;

/** A line of prose and code that has to stay within the given width */
function fittedMixed(x, y, parts, width) {
  const needed = mixedWidth(parts);
  if (needed > width) {
    const text = parts.map(([part]) => part).join('');
    throw new Error(`"${text}" needs about ${Math.ceil(needed)} px but has only ${Math.floor(width)} px. Move or shorten it.`);
  }
  return mixed(x, y, parts);
}

// The same app twice, as folder trees. Each row is [depth, name, folder, part of the requests].
const TREE_BY_KIND = [
  [0, 'src/', true],
  [1, 'views/', true],
  [2, 'CatalogView.vue'],
  [2, 'ItemView.vue'],
  [2, 'RequestsView.vue', false, true],
  [1, 'components/', true],
  [2, 'ItemCard.vue'],
  [2, 'ReservationForm.vue', false, true],
  [1, 'stores/', true],
  [2, 'catalog.js'],
  [2, 'reservations.js', false, true],
  [1, 'composables/', true],
  [2, 'useSearch.js'],
  [1, 'reservation.js', false, true],
];

const TREE_BY_FEATURE = [
  [0, 'src/', true],
  [1, 'features/', true],
  [2, 'catalog/', true],
  [3, 'CatalogView.vue'],
  [3, 'catalogStore.js'],
  [3, 'routes.js'],
  [2, 'reservations/', true, true],
  [3, 'RequestsView.vue', false, true],
  [3, 'ReservationForm.vue', false, true],
  [3, 'reservationsStore.js', false, true],
  [3, 'rules.js', false, true],
  [1, 'components/', true],
  [2, 'ItemCard.vue'],
  [1, 'api/', true],
  [2, 'http.js'],
];

const INDENT = 18;
const ROW = 22;
const ROW_ICON = 14;

/** A white chip with a blue border behind rows of the requests, the same mark in both trees and in the key */
function mark(x, y, w, h) {
  return `<rect class="d-tile d-tile-accent" x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/>`;
}

/** A folder tree as indented rows, thin guide lines lead from each folder to its children */
function tree(x, top, rows, right) {
  const iconX = (depth) => x + depth * INDENT;
  const nameX = (depth) => iconX(depth) + ROW_ICON + 6;
  const center = (row) => top + row * ROW;
  const parts = [];
  // Marked rows that follow each other share one chip, so a feature folder reads as one block
  const runs = [];
  rows.forEach(([, , , marked], row) => {
    if (!marked) return;
    if (runs.length && runs.at(-1).last === row - 1) runs.at(-1).last = row;
    else runs.push({ first: row, last: row });
  });
  runs.forEach(({ first, last }) => {
    const span = rows.slice(first, last + 1);
    const start = Math.min(...span.map(([depth]) => iconX(depth))) - 4;
    const end = Math.max(...span.map(([depth, name]) => nameX(depth) + measure(name, SIZE.code, { mono: true }))) + 8;
    parts.push(mark(start, center(first) - 10, end - start, center(last) - center(first) + 20));
  });
  rows.forEach(([depth, , folder], row) => {
    if (!folder) return;
    const children = [];
    for (let next = row + 1; next < rows.length && rows[next][0] > depth; next += 1) {
      if (rows[next][0] === depth + 1) children.push(next);
    }
    if (!children.length) return;
    const guide = iconX(depth) + ROW_ICON / 2;
    const ticks = children.map((child) => ` M ${guide} ${center(child)} H ${iconX(depth + 1) - 4}`).join('');
    parts.push(`<path class="d-axis" d="M ${guide} ${center(row) + ROW_ICON / 2 + 1} V ${center(children.at(-1))}${ticks}"/>`);
  });
  rows.forEach(([depth, name, folder], row) => {
    parts.push(
      icon(folder ? 'folder' : 'doc', iconX(depth), center(row) - ROW_ICON / 2, ROW_ICON),
      fitted(nameX(depth), center(row) + 4, name, right - nameX(depth), 'start', { code: true }),
    );
  });
  return parts;
}

function folders(lang) {
  const t = TEXT[lang].folders;
  const id = `p8c1-folders-${lang}`;
  const top = 64;
  const rows = Math.max(TREE_BY_KIND.length, TREE_BY_FEATURE.length);
  const bottom = top + (rows - 1) * ROW + 26;
  const key = bottom + 26;
  const body = [
    band(16, 16, 316, bottom - 16, 1),
    label(32, 40, t.left),
    band(348, 16, 316, bottom - 16, 2),
    label(364, 40, t.right, 'start', { tone: 'blue' }),
    ...tree(32, top, TREE_BY_KIND, 316),
    ...tree(364, top, TREE_BY_FEATURE, 648),
    // The key repeats the chip of a marked file
    mark(32, key - 10, 30, 20),
    icon('doc', 40, key - ROW_ICON / 2, ROW_ICON),
    fitted(72, key + 4, t.marked, WIDTH - 32 - 72),
  ];
  return figure({ id, width: WIDTH, height: key + 26, title: t.title, desc: t.desc, body });
}

function layers(lang) {
  const t = TEXT[lang].layers;
  const id = `p8c1-layers-${lang}`;
  const rows = [56, 144, 232];
  const full = { x: 32, w: WIDTH - 64 };
  const shared = { x: 32, w: 300 };
  const api = { x: 348, w: 300 };
  const server = { x: api.x, y: 344, w: api.w };
  const bandBottom = rows[2] + CARD_H + 16;
  const sharedMid = shared.x + shared.w / 2;
  const apiMid = api.x + api.w / 2;
  const between = (row) => (rows[row] + CARD_H + rows[row + 1]) / 2 + 4;
  const body = [
    band(16, 16, WIDTH - 32, bandBottom - 16, 1),
    label(32, 40, t.group),
    arrow(id, [[WIDTH / 2, rows[0] + CARD_H + 1.5], [WIDTH / 2, rows[1] - 4]]),
    fitted(WIDTH / 2 + 10, between(0), t.imports, WIDTH - 32 - WIDTH / 2 - 10),
    arrow(id, [[sharedMid, rows[1] + CARD_H + 1.5], [sharedMid, rows[2] - 4]]),
    fitted(sharedMid + 10, between(1), t.imports, api.x - 16 - sharedMid - 10),
    arrow(id, [[apiMid, rows[1] + CARD_H + 1.5], [apiMid, rows[2] - 4]]),
    fitted(apiMid + 10, between(1), t.imports, WIDTH - 32 - apiMid - 10),
    // The one call that leaves the app, drawn in the tone of the server
    arrow(id, [[apiMid, rows[2] + CARD_H + 1.5], [apiMid, server.y - 4]], { tone: 'violet' }),
    fitted(apiMid + 10, (rows[2] + CARD_H + server.y) / 2 + 4, t.fetch, WIDTH - 32 - apiMid - 10, 'start', { code: true }),
    tile(full.x, rows[0], full.w, CARD_H, ...t.boxes.app, { code: true, icon: 'browser' }),
    tile(full.x, rows[1], full.w, CARD_H, ...t.boxes.features, { icon: 'folder' }),
    tile(shared.x, rows[2], shared.w, CARD_H, ...t.boxes.shared, { code: true, icon: 'block' }),
    tile(api.x, rows[2], api.w, CARD_H, ...t.boxes.api, { accent: true, code: true, icon: 'code' }),
    tile(server.x, server.y, server.w, CARD_H, ...t.boxes.server, { tone: 'violet', icon: 'server' }),
    strip(shared.x, server.y + 9, shared.w, 30, t.note),
  ];
  return figure({ id, width: WIDTH, height: server.y + CARD_H + 16, title: t.title, desc: t.desc, body });
}

function adrStatus(lang) {
  const t = TEXT[lang].status;
  const id = `p8c3-status-${lang}`;
  // One band per stage, the last one is wider for the longest state
  const stages = [
    { x: 16, w: 188 },
    { x: 228, w: 188 },
    { x: 440, w: 224 },
  ];
  const cards = stages.map((s) => ({ x: s.x + 16, w: s.w - 32 }));
  const h = 40;
  const rows = [56, 120, 184];
  const level = (row) => rows[row] + h / 2;
  const bottom = rows[2] + h + 16;
  // The arrows turn in the gaps between the bands
  const turns = [0, 1].map((i) => (stages[i].x + stages[i].w + stages[i + 1].x) / 2);
  const [first, second, third] = cards;
  const body = [
    // The middle band holds the decision, the step the figure is about
    ...stages.flatMap((s, i) => [
      band(s.x, 16, s.w, bottom - 16, i === 1 ? 2 : 1),
      label(s.x + 16, 40, t.stages[i], 'start', i === 1 ? { tone: 'blue' } : {}),
    ]),
    arrow(id, [[first.x + first.w, level(1)], [turns[0], level(1)], [turns[0], level(0)], [second.x - 4, level(0)]]),
    arrow(id, [[first.x + first.w, level(1)], [turns[0], level(1)], [turns[0], level(2)], [second.x - 4, level(2)]]),
    arrow(id, [[second.x + second.w, level(0)], [third.x - 4, level(0)]]),
    arrow(id, [[second.x + second.w, level(0)], [turns[1], level(0)], [turns[1], level(1)], [third.x - 4, level(1)]]),
    tile(first.x, rows[1], first.w, h, t.states.proposed, '', { icon: 'doc' }),
    tile(second.x, rows[0], second.w, h, t.states.accepted, '', { accent: true, icon: 'check' }),
    tile(second.x, rows[2], second.w, h, t.states.rejected, '', { icon: 'cross' }),
    tile(third.x, rows[0], third.w, h, t.states.deprecated, '', { icon: 'clock' }),
    tile(third.x, rows[1], third.w, h, t.states.superseded, '', { icon: 'link' }),
    strip(16, bottom + 16, WIDTH - 32, 30, t.note),
  ];
  return figure({ id, width: WIDTH, height: bottom + 16 + 30 + 16, title: t.title, desc: t.desc, body });
}

function deployFlow(lang) {
  const t = TEXT[lang].deploy;
  const id = `p8c6-deploy-${lang}`;
  const main = { x: 32, w: 272 };
  const side = { x: 352, w: 296 };
  const mid = main.x + main.w / 2;
  const sideMid = side.x + side.w / 2;
  // The push comes from outside GitHub, the two bands are the services that take over
  const push = 16;
  const actions = { y: 96, h: 104 };
  const pages = { y: 240, h: 184 };
  const work = actions.y + 40;
  const site = pages.y + 40;
  const fallback = site + CARD_H + 32;
  const body = [
    band(16, actions.y, WIDTH - 32, actions.h, 2),
    label(32, actions.y + 24, t.actions, 'start', { tone: 'blue' }),
    band(16, pages.y, WIDTH - 32, pages.h, 4),
    label(32, pages.y + 24, t.pages, 'start', { tone: 'teal' }),
    arrow(id, [[mid, push + CARD_H + 1.5], [mid, work - 4]]),
    fitted(mid + 10, (push + CARD_H + actions.y) / 2 + 4, t.starts, side.x - mid - 18),
    // A failing test stops the workflow before anything is published
    arrow(id, [[main.x + main.w, work + CARD_H / 2], [side.x - 4, work + CARD_H / 2]], { dashed: true }),
    arrow(id, [[mid, work + CARD_H + 1.5], [mid, site - 4]]),
    fittedMixed(mid + 10, (actions.y + actions.h + pages.y) / 2 + 4, t.artifact, side.x - mid - 18),
    arrow(id, [[main.x + main.w, site + CARD_H / 2], [side.x - 4, site + CARD_H / 2]]),
    arrow(id, [[sideMid, site + CARD_H + 1.5], [sideMid, fallback - 4]]),
    fitted(sideMid + 10, (site + CARD_H + fallback) / 2 + 4, t.serves, side.x + side.w - sideMid - 10),
    tile(main.x, push, main.w, CARD_H, ...t.push, { code: true, icon: 'repo' }),
    tile(main.x, work, main.w, CARD_H, ...t.workflow, { accent: true, code: true, icon: 'play' }),
    placeholder(side.x, work, side.w, CARD_H, t.fail),
    tile(main.x, site, main.w, CARD_H, ...t.site, { code: true, icon: 'globe' }),
    tile(side.x, site, side.w, CARD_H, ...t.unknown, { code: true, icon: 'link' }),
    tile(side.x, fallback, side.w, CARD_H, ...t.fallback, { accent: true, icon: 'doc' }),
  ];
  return figure({ id, width: WIDTH, height: pages.y + pages.h + 16, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) {
  save(lang, 'p8c1-folders', folders(lang));
  save(lang, 'p8c1-layers', layers(lang));
  save(lang, 'p8c3-adr-status', adrStatus(lang));
  save(lang, 'p8c6-deploy-flow', deployFlow(lang));
}
