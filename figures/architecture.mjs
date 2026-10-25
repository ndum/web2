/**
 * Figures of part 8, architecture, quality and operations. Writes one SVG per language into
 * site/src/assets/figures/<lang>/. Colours come from classes that site/src/styles/course.css maps to
 * the theme variables of the site, so the inlined figures follow light and dark mode.
 *
 *   node figures/architecture.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { sketch } from './sketch.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT = {
  de: {
    folders: {
      title: 'Ordner nach Art und nach Feature',
      desc:
        'Zwei Ordnerbäume nebeneinander. Links ist die App nach Art der Dateien geordnet, in views, components, stores und composables, und die vier Dateien der Anfragen liegen in vier verschiedenen Ordnern. ' +
        'Rechts hat jedes Feature einen Ordner unter features, catalog und reservations mit ihren Seiten, Komponenten, Stores und Routen. Die Dateien der Anfragen liegen dort beisammen. ' +
        'Gemeinsame Bausteine stehen in components, die Schicht für die API in api.',
      left: 'Nach Art der Dateien',
      right: 'Nach Feature',
      note: 'markiert sind die Dateien der Anfragen',
    },
    layers: {
      title: 'Die Schichten der App',
      desc:
        'Vier Ebenen von oben nach unten, die Pfeile zeigen, wer wen importiert. Zuoberst setzen main.js, App.vue und der Router die App zusammen und importieren die Features. ' +
        'Die Features enthalten Seiten, eigene Komponenten und Stores und importieren gemeinsame Bausteine und die Schicht für die API. Gemeinsame Bausteine in components, composables und utils kennen kein Feature. ' +
        'Nur die Schicht für die API in src/api spricht mit fetch mit dem Server. Kein Pfeil zeigt nach oben.',
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
        'Ein Zustandsdiagramm. Ein Entscheid beginnt als vorgeschlagen und wird angenommen oder abgelehnt. Ein angenommener Entscheid kann später veralten oder durch einen neuen Entscheid ersetzt werden, der auf ihn verweist. ' +
        'Gelöscht wird kein Entscheid, er behält seine Nummer und bleibt im Verzeichnis.',
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
        'Ein Ablauf von oben nach unten. Ein Push auf main startet einen Workflow von GitHub Actions, der die Pakete mit npm ci installiert, die Tests mit npm test ausführt und mit npm run build baut. ' +
        'Schlägt ein Test fehl, endet der Workflow, und nichts geht online. Der Ordner dist geht als Artefakt an GitHub Pages, das die App unter name.github.io/lorraine-commons/ ausliefert. ' +
        'Rechts zweigt eine Adresse ab, die GitHub Pages nicht kennt, etwa /lorraine-commons/items/6. Dafür liefert Pages die Datei 404.html, eine Kopie von index.html, und der Router zeigt die Seite des Dings.',
      steps: [
        ['Push auf main', 'git push', true],
        ['GitHub Actions', 'npm ci, npm test, npm run build', true],
        ['Artefakt', 'der Ordner dist', false],
        ['GitHub Pages', 'name.github.io/lorraine-commons/', true],
      ],
      fail: ['Test schlägt fehl', 'nichts geht online'],
      unknown: ['Unbekannte Adresse', '/lorraine-commons/items/6'],
      fallback: ['404.html', 'Kopie von index.html, der Router zeigt die Seite'],
    },
  },
  en: {
    folders: {
      title: 'Folders by kind and by feature',
      desc:
        'Two folder trees side by side. On the left the app is sorted by the kind of file, in views, components, stores and composables, and the four files of the requests sit in four different folders. ' +
        'On the right every feature has a folder below features, catalog and reservations with their pages, components, stores and routes. The files of the requests sit together there. ' +
        'Shared building blocks live in components, the layer for the API in api.',
      left: 'By kind of file',
      right: 'By feature',
      note: 'the files of the requests are marked',
    },
    layers: {
      title: 'The layers of the app',
      desc:
        'Four levels from top to bottom, the arrows show who imports whom. At the top, main.js, App.vue and the router put the app together and import the features. ' +
        'The features hold pages, their own components and stores, and they import shared building blocks and the layer for the API. Shared building blocks in components, composables and utils know no feature. ' +
        'Only the layer for the API in src/api talks to the server with fetch. No arrow points upwards.',
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
        'A state diagram. A decision starts as proposed and is accepted or rejected. An accepted decision can later become deprecated or be superseded by a new decision that points to it. ' +
        'No decision is deleted, it keeps its number and stays in the index.',
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
        'A flow from top to bottom. A push to main starts a workflow of GitHub Actions that installs the packages with npm ci, runs the tests with npm test and builds with npm run build. ' +
        'If a test fails, the workflow ends and nothing goes online. The folder dist goes to GitHub Pages as an artifact, and Pages serves the app at name.github.io/lorraine-commons/. ' +
        'On the right, an address that GitHub Pages does not know branches off, such as /lorraine-commons/items/6. For it, Pages serves the file 404.html, a copy of index.html, and the router shows the page of the thing.',
      steps: [
        ['Push to main', 'git push', true],
        ['GitHub Actions', 'npm ci, npm test, npm run build', true],
        ['Artifact', 'the folder dist', false],
        ['GitHub Pages', 'name.github.io/lorraine-commons/', true],
      ],
      fail: ['A test fails', 'nothing goes online'],
      unknown: ['Unknown address', '/lorraine-commons/items/6'],
      fallback: ['404.html', 'copy of index.html, the router shows the page'],
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

// A box with a name and a line below it
function box(x, y, width, height, [name, sub], strong = false, code = false) {
  return [
    `<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${x}" y="${y}" width="${width}" height="${height}" rx="6"/>`,
    `<text class="fig-text" x="${x + 14}" y="${y + 21}" style="font-size: 14px">${escape(name)}</text>`,
    `<text class="${code ? 'fig-code' : 'fig-sub'}" x="${x + 14}" y="${y + 39}">${escape(sub)}</text>`,
  ];
}

// The same app twice, as folder trees. Each line is [depth, name, folder, part of the requests].
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

function folders(lang) {
  const t = TEXT[lang].folders;
  const id = `p8c1-folders-${lang}`;
  const parts = [];
  const top = 44;
  const row = 22;
  const drawTree = (x, title, lines) => {
    parts.push(`<text class="fig-text fig-strong" x="${x}" y="24" style="font-size: 15px">${escape(title)}</text>`);
    lines.forEach(([depth, name, folder, marked], index) => {
      const y = top + index * row;
      if (marked) parts.push(`<rect class="fig-box fig-box-strong" x="${x + depth * 18 - 6}" y="${y - 15}" width="${name.length * 8.4 + 14}" height="20" rx="4"/>`);
      parts.push(`<text class="fig-code${folder ? ' fig-strong' : ''}" x="${x + depth * 18}" y="${y}">${escape(name)}</text>`);
    });
  };
  drawTree(20, t.left, TREE_BY_KIND);
  drawTree(330, t.right, TREE_BY_FEATURE);
  const bottom = top + TREE_BY_FEATURE.length * row;
  parts.push(`<text class="fig-sub" x="20" y="${bottom + 6}">${escape(t.note)}</text>`);
  return svg(id, 640, bottom + 20, t, parts);
}

function layers(lang) {
  const t = TEXT[lang].layers;
  const id = `p8c1-layers-${lang}`;
  const parts = [];
  const width = 250;
  const height = 50;
  const center = 300;
  const rows = [20, 120, 220, 320];
  const appX = center - width / 2;
  const leftX = 40;
  const rightX = 310;
  parts.push(
    ...box(appX, rows[0], width, height, t.boxes.app, false, false),
    ...box(appX, rows[1], width, height, t.boxes.features, true),
    ...box(leftX, rows[2], width, height, t.boxes.shared),
    ...box(rightX, rows[2], width, height, t.boxes.api, true),
    ...box(rightX, rows[3], width, height, t.boxes.server),
    arrow(id, `M ${center} ${rows[0] + height + 2} L ${center} ${rows[1] - 4}`),
    `<text class="fig-sub" x="${center + 10}" y="${rows[0] + height + 30}">${escape(t.imports)}</text>`,
    arrow(id, `M ${center - 40} ${rows[1] + height + 2} L ${leftX + width / 2} ${rows[2] - 4}`),
    arrow(id, `M ${center + 40} ${rows[1] + height + 2} L ${rightX + width / 2} ${rows[2] - 4}`),
    `<text class="fig-sub" x="${center}" y="${rows[1] + height + 30}" text-anchor="middle">${escape(t.imports)}</text>`,
    arrow(id, `M ${rightX + width / 2} ${rows[2] + height + 2} L ${rightX + width / 2} ${rows[3] - 4}`, true),
    `<text class="fig-code" x="${rightX + width / 2 + 10}" y="${rows[2] + height + 30}">${escape(t.fetch)}</text>`,
    `<text class="fig-sub fig-strong" x="${leftX}" y="${rows[3] + 30}">${escape(t.note)}</text>`,
  );
  return svg(id, 600, rows[3] + height + 20, t, parts);
}

function adrStatus(lang) {
  const t = TEXT[lang].status;
  const id = `p8c3-status-${lang}`;
  const parts = [];
  const width = 190;
  const height = 40;
  const state = (x, y, name, strong = false) => [
    `<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${x}" y="${y}" width="${width}" height="${height}" rx="20"/>`,
    `<text class="fig-text" x="${x + width / 2}" y="${y + 25}" text-anchor="middle" style="font-size: 14px">${escape(name)}</text>`,
  ];
  const col = [20, 270, 520];
  const row = [20, 90, 160];
  parts.push(
    ...state(col[0], row[1], t.states.proposed),
    ...state(col[1], row[0], t.states.accepted, true),
    ...state(col[1], row[2], t.states.rejected),
    ...state(col[2], row[0], t.states.deprecated),
    ...state(col[2], row[1], t.states.superseded),
    arrow(id, `M ${col[0] + width + 2} ${row[1] + 12} L ${col[1] - 4} ${row[0] + height / 2}`),
    arrow(id, `M ${col[0] + width + 2} ${row[1] + 28} L ${col[1] - 4} ${row[2] + height / 2}`),
    arrow(id, `M ${col[1] + width + 2} ${row[0] + height / 2} L ${col[2] - 4} ${row[0] + height / 2}`),
    arrow(id, `M ${col[1] + width + 2} ${row[0] + height - 6} L ${col[2] - 4} ${row[1] + height / 2}`),
    `<text class="fig-sub fig-strong" x="${col[1]}" y="${row[2] + height + 34}">${escape(t.note)}</text>`,
  );
  return svg(id, col[2] + width + 20, row[2] + height + 50, t, parts);
}

function deployFlow(lang) {
  const t = TEXT[lang].deploy;
  const id = `p8c6-deploy-${lang}`;
  const parts = [];
  const left = 20;
  const width = 300;
  const height = 50;
  const step = 82;
  const top = 16;
  t.steps.forEach(([name, sub, code], index) => {
    const y = top + index * step;
    parts.push(...box(left, y, width, height, [name, sub], index !== 2, code));
    if (index < t.steps.length - 1) parts.push(arrow(id, `M ${left + width / 2} ${y + height + 2} L ${left + width / 2} ${y + step - 4}`));
  });
  // A failing test ends the workflow on the right of GitHub Actions
  const sideX = left + width + 60;
  const actionsY = top + step;
  parts.push(
    arrow(id, `M ${left + width + 2} ${actionsY + height / 2} L ${sideX - 4} ${actionsY + height / 2}`, true),
    ...box(sideX, actionsY, 270, height, t.fail),
  );
  // An unknown address on the right of GitHub Pages leads to the copy of index.html
  const pagesY = top + 3 * step;
  const fallbackY = pagesY + step;
  parts.push(
    arrow(id, `M ${left + width + 2} ${pagesY + height / 2} L ${sideX - 4} ${pagesY + height / 2}`),
    ...box(sideX, pagesY, 270, height, t.unknown, false, true),
    arrow(id, `M ${sideX + 135} ${pagesY + height + 2} L ${sideX + 135} ${fallbackY - 4}`),
    ...box(sideX - 60, fallbackY, 330, height, t.fallback, true),
  );
  return svg(id, sideX + 290, fallbackY + height + 16, t, parts);
}

for (const lang of Object.keys(TEXT)) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'p8c1-folders.svg'), sketch(folders(lang), 'p8c1-folders'));
  writeFileSync(join(folder, 'p8c1-layers.svg'), sketch(layers(lang), 'p8c1-layers'));
  writeFileSync(join(folder, 'p8c3-adr-status.svg'), sketch(adrStatus(lang), 'p8c3-adr-status'));
  writeFileSync(join(folder, 'p8c6-deploy-flow.svg'), sketch(deployFlow(lang), 'p8c6-deploy-flow'));
}
