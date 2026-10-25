/**
 * Figures of part 6, routing. Writes one SVG per language into site/src/assets/figures/<lang>/.
 * Colours come from classes that site/src/styles/course.css maps to the theme variables of the
 * site, so the inlined figures follow light and dark mode.
 *
 *   node figures/routing.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT = {
  de: {
    url: {
      title: 'Teile einer Adresse',
      desc:
        'Zwei Adressen, in ihre Teile zerlegt. Oben /items/6, davon ist /items/ der feste Teil der Route /items/:id und 6 der Parameter, den route.params.id als Text liefert. ' +
        'Unten /?q=säge&category=Werkzeug&sort=deposit, davon ist / der Pfad, und die Query besteht aus q, category und sort, die route.query.q, route.query.category und route.query.sort liefern.',
      first: [
        ['/items/', 'fester Teil der Route', '/items/:id'],
        ['6', 'Parameter', "route.params.id = '6'"],
      ],
      second: [
        ['/', 'Pfad', ''],
        ['?q=säge', 'Query', 'route.query.q'],
        ['&category=Werkzeug', 'Query', 'route.query.category'],
        ['&sort=deposit', 'Query', 'route.query.sort'],
      ],
    },
    tree: {
      title: 'Die Routen der Fallbeispiel-App',
      desc:
        'Ein Baum mit App und ihrer RouterView oben. Darunter die Routen / mit CatalogView, /items/:id mit ItemView, /favorites mit FavoritesView, /association mit AssociationView, ' +
        '/login mit LoginView, /team mit TeamLayout und die Catch-all-Route mit NotFoundView. TeamLayout hat eine eigene RouterView mit den Kindrouten für die Ausleihen und die Rückgaben. ' +
        'Neben /team steht, dass der Bereich nur für das Team ist und erst bei Bedarf geladen wird, neben der Catch-all-Route, dass sie alle anderen Adressen fängt.',
      root: ['App', 'RouterView'],
      routes: [
        ['/', 'CatalogView', ''],
        ['/items/:id(\\d+)', 'ItemView', ''],
        ['/favorites', 'FavoritesView', ''],
        ['/association', 'AssociationView', ''],
        ['/login', 'LoginView', ''],
        ['/team', 'TeamLayout', 'nur Team, lädt bei Bedarf'],
        ["''", 'TeamLoansView', 'Ausleihen'],
        ['returns', 'TeamReturnsView', 'Rückgaben'],
        ['/:pathMatch(.*)*', 'NotFoundView', 'alle anderen Adressen'],
      ],
    },
    flow: {
      title: 'Der Ablauf einer Navigation',
      desc:
        'Eine Folge von oben nach unten. Eine Navigation beginnt mit einem RouterLink oder router.push. Dann laufen onBeforeRouteLeave in der Seite, die man verlässt, beforeEach für jede Navigation, ' +
        'beforeEnter nur beim Betreten einer Route, das Laden der Komponenten und beforeResolve. Danach ist die Navigation bestätigt, afterEach läuft, und das DOM zeigt die neue Seite. ' +
        'Rechts steht, dass jeder Guard mit false die Navigation abbricht und mit einer Route auf eine neue Navigation umleitet.',
      steps: [
        ['Navigation beginnt', 'RouterLink, router.push', false],
        ['onBeforeRouteLeave', 'in der Seite, die man verlässt', true],
        ['beforeEach', 'global, bei jeder Navigation', true],
        ['beforeEnter', 'nur beim Betreten der Route', true],
        ['Komponenten laden', 'Routen mit import()', false],
        ['beforeResolve', 'global, kurz vor dem Bestätigen', true],
        ['Navigation bestätigt', 'die Adresse ändert sich', false],
        ['afterEach', 'Titel, Fokus, hält nichts mehr auf', true],
        ['DOM aktualisiert', 'die neue Seite erscheint', false],
      ],
      guards: 'Guards',
      cancel: ['return false', 'Navigation abgebrochen'],
      redirect: ['return { name: … }', 'Umleitung, neue Navigation'],
    },
  },
  en: {
    url: {
      title: 'Parts of an address',
      desc:
        'Two addresses taken apart. At the top /items/6, where /items/ is the fixed part of the route /items/:id and 6 is the param that route.params.id returns as a string. ' +
        'At the bottom /?q=saw&category=Tools&sort=deposit, where / is the path, and the query consists of q, category and sort, returned by route.query.q, route.query.category and route.query.sort.',
      first: [
        ['/items/', 'fixed part of the route', '/items/:id'],
        ['6', 'param', "route.params.id = '6'"],
      ],
      second: [
        ['/', 'path', ''],
        ['?q=saw', 'query', 'route.query.q'],
        ['&category=Tools', 'query', 'route.query.category'],
        ['&sort=deposit', 'query', 'route.query.sort'],
      ],
    },
    tree: {
      title: 'The routes of the case app',
      desc:
        'A tree with App and its RouterView at the top. Below it the routes / with CatalogView, /items/:id with ItemView, /favorites with FavoritesView, /association with AssociationView, ' +
        '/login with LoginView, /team with TeamLayout and the catch-all route with NotFoundView. TeamLayout has a RouterView of its own with the child routes for loans and returns. ' +
        'Next to /team it says that the area is for the team only and is loaded on demand, next to the catch-all route that it catches every other address.',
      root: ['App', 'RouterView'],
      routes: [
        ['/', 'CatalogView', ''],
        ['/items/:id(\\d+)', 'ItemView', ''],
        ['/favorites', 'FavoritesView', ''],
        ['/association', 'AssociationView', ''],
        ['/login', 'LoginView', ''],
        ['/team', 'TeamLayout', 'team only, loaded on demand'],
        ["''", 'TeamLoansView', 'loans'],
        ['returns', 'TeamReturnsView', 'returns'],
        ['/:pathMatch(.*)*', 'NotFoundView', 'every other address'],
      ],
    },
    flow: {
      title: 'The navigation flow',
      desc:
        'A sequence from top to bottom. A navigation starts with a RouterLink or router.push. Then onBeforeRouteLeave runs in the page being left, beforeEach for every navigation, ' +
        'beforeEnter only when a route is entered, the components are loaded and beforeResolve runs. After that the navigation is confirmed, afterEach runs and the DOM shows the new page. ' +
        'On the right it says that every guard cancels the navigation with false and redirects to a new navigation with a route.',
      steps: [
        ['Navigation starts', 'RouterLink, router.push', false],
        ['onBeforeRouteLeave', 'in the page being left', true],
        ['beforeEach', 'global, on every navigation', true],
        ['beforeEnter', 'only when entering the route', true],
        ['Components load', 'routes with import()', false],
        ['beforeResolve', 'global, right before confirming', true],
        ['Navigation confirmed', 'the address changes', false],
        ['afterEach', 'title, focus, stops nothing', true],
        ['DOM updated', 'the new page appears', false],
      ],
      guards: 'Guards',
      cancel: ['return false', 'navigation cancelled'],
      redirect: ['return { name: … }', 'redirect, new navigation'],
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

const arrow = (id, path) => `<path class="fig-arrow" d="${path}" marker-end="url(#${id}-head)"/>`;
const line = (path) => `<path class="fig-arrow" d="${path}"/>`;

// Widths of monospace text at 14px and of sans-serif text at 13px, generous so the text fits
const codeWidth = (text) => text.length * 8.6;
const subWidth = (text) => text.length * 7;

// An address as a row of boxes, one per part, with a label below each box
function addressRow(id, parts, x, y) {
  const out = [];
  let left = x;
  for (const [code, label, detail] of parts) {
    const width = Math.max(codeWidth(code), subWidth(label), detail ? codeWidth(detail) * 0.86 : 0) + 24;
    out.push(
      `<rect class="fig-box fig-box-strong" x="${left}" y="${y}" width="${width}" height="40" rx="4"/>`,
      `<text class="fig-code fig-strong" x="${left + width / 2}" y="${y + 25}" text-anchor="middle" style="font-size: 14px">${escape(code)}</text>`,
      line(`M ${left + width / 2} ${y + 42} L ${left + width / 2} ${y + 58}`),
      `<text class="fig-sub" x="${left + width / 2}" y="${y + 74}" text-anchor="middle">${escape(label)}</text>`,
    );
    if (detail) {
      out.push(`<text class="fig-code" x="${left + width / 2}" y="${y + 92}" text-anchor="middle">${escape(detail)}</text>`);
    }
    left += width + 6;
  }
  return { parts: out, right: left };
}

function urlParts(lang) {
  const t = TEXT[lang].url;
  const id = `p6c2-url-${lang}`;
  const first = addressRow(id, t.first, 20, 30);
  const second = addressRow(id, t.second, 20, 150);
  return svg(id, Math.max(first.right, second.right) + 14, 262, t, [...first.parts, ...second.parts]);
}

function routeTree(lang) {
  const t = TEXT[lang].tree;
  const id = `p6c3-tree-${lang}`;
  const parts = [];
  const rowHeight = 46;
  const top = 16;
  const boxWidth = 250;
  // App with its RouterView at the top
  parts.push(
    `<rect class="fig-box fig-box-strong" x="20" y="${top}" width="${boxWidth - 60}" height="40" rx="6"/>`,
    `<text class="fig-text" x="36" y="${top + 26}">${escape(t.root[0])}</text>`,
    `<text class="fig-code" x="${boxWidth - 56}" y="${top + 25}" text-anchor="end">${escape(t.root[1])}</text>`,
  );
  const trunk = 44;
  let lastTopLevel = top + 40;
  t.routes.forEach(([path, component, note], index) => {
    const child = index === 6 || index === 7;
    const y = top + (index + 1) * rowHeight + 6;
    const x = child ? 110 : 76;
    const width = child ? boxWidth - 34 : boxWidth;
    const lazy = index === 5 || child;
    parts.push(
      `<rect class="fig-box${index === 5 ? ' fig-box-strong' : ''}" x="${x}" y="${y}" width="${width}" height="38" rx="6"${lazy ? ' stroke-dasharray="5 4"' : ''}/>`,
      `<text class="fig-code fig-strong" x="${x + 12}" y="${y + 24}" style="font-size: 13px">${escape(path)}</text>`,
      `<text class="fig-sub" x="${x + width - 12}" y="${y + 24}" text-anchor="end">${escape(component)}</text>`,
    );
    // Connector from the trunk of the parent
    const branchX = child ? 92 : trunk;
    parts.push(line(`M ${branchX} ${y + 19} L ${x - 2} ${y + 19}`));
    if (!child) lastTopLevel = y + 19;
    if (note) parts.push(`<text class="fig-sub fig-note" x="${x + width + 14}" y="${y + 24}">${escape(note)}</text>`);
  });
  // Trunks, one from App down to the last route, one from TeamLayout to its children
  parts.push(line(`M ${trunk} ${top + 42} L ${trunk} ${lastTopLevel}`));
  const teamY = top + 6 * rowHeight + 6;
  parts.push(line(`M 92 ${teamY + 40} L 92 ${top + 8 * rowHeight + 6 + 19}`));
  return svg(id, 560, top + 10 * rowHeight + 10, t, parts);
}

function guardFlow(lang) {
  const t = TEXT[lang].flow;
  const id = `p6c4-flow-${lang}`;
  const parts = [];
  const left = 20;
  const width = 270;
  const step = 58;
  const top = 16;
  t.steps.forEach(([name, sub, guard], index) => {
    const y = top + index * step;
    parts.push(
      `<rect class="fig-box${guard ? ' fig-box-strong' : ''}" x="${left}" y="${y}" width="${width}" height="42" rx="6"/>`,
      `<text class="${guard ? 'fig-code fig-strong' : 'fig-text'}" x="${left + 14}" y="${y + 17}" style="font-size: 14px">${escape(name)}</text>`,
      `<text class="fig-sub" x="${left + 14}" y="${y + 33}">${escape(sub)}</text>`,
    );
    if (index < t.steps.length - 1) parts.push(arrow(id, `M ${left + width / 2} ${y + 44} L ${left + width / 2} ${y + step - 2}`));
  });
  // The guards between leave and resolve can stop or redirect the navigation
  const from = top + step + 20;
  const to = top + 5 * step + 20;
  const bracketX = left + width + 16;
  parts.push(
    line(`M ${bracketX} ${from} L ${bracketX + 12} ${from} L ${bracketX + 12} ${to} L ${bracketX} ${to}`),
    `<text class="fig-sub fig-strong" x="${bracketX + 22}" y="${top + 3 * step + 25}">${escape(t.guards)}</text>`,
  );
  const outcome = (y, [code, label]) => [
    arrow(id, `M ${bracketX + 14} ${y} L ${bracketX + 82} ${y}`),
    `<rect class="fig-box" x="${bracketX + 86}" y="${y - 24}" width="196" height="48" rx="6"/>`,
    `<text class="fig-code fig-strong" x="${bracketX + 98}" y="${y - 4}" style="font-size: 13px">${escape(code)}</text>`,
    `<text class="fig-sub" x="${bracketX + 98}" y="${y + 14}">${escape(label)}</text>`,
  ];
  parts.push(...outcome(top + 2 * step + 20, t.cancel), ...outcome(top + 4 * step + 20, t.redirect));
  return svg(id, bracketX + 300, top + t.steps.length * step - 10, t, parts);
}

for (const lang of Object.keys(TEXT)) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'p6c2-url-parts.svg'), urlParts(lang));
  writeFileSync(join(folder, 'p6c3-route-tree.svg'), routeTree(lang));
  writeFileSync(join(folder, 'p6c4-guard-flow.svg'), guardFlow(lang));
}
