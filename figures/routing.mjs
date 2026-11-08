/**
 * Figures of part 6, routing. Writes one SVG per language into site/src/assets/figures/<lang>/.
 *
 *   node figures/routing.mjs
 */
import {
  arrow,
  band,
  figure,
  fitted,
  heading,
  ICON_SPACE,
  label,
  labelWidth,
  line,
  measure,
  note,
  PADDING,
  placeholder,
  room,
  save,
  SIZE,
  tag,
  tagWidth,
  tile,
  WIDTH,
} from './diagram.mjs';

const TEXT = {
  de: {
    url: {
      title: 'Teile einer Adresse',
      desc:
        'Zwei Adressen in zwei Bändern, in ihre Teile zerlegt. Unter jedem Teil steht eine Klammer mit seinem Namen. ' +
        'Oben /items/6, davon ist /items/ der feste Teil der Route /items/:id und 6 der Parameter, den route.params.id als Text liefert. ' +
        'Unten /?q=säge&category=Werkzeug&sort=deposit, davon ist / der Pfad, und die Query besteht aus q, category und sort, ' +
        'die route.query.q, route.query.category und route.query.sort liefern.',
      first: {
        label: 'Adresse mit Parameter',
        parts: [
          ['/items/', 'fester Teil der Route', '/items/:id', ''],
          ['6', 'Parameter', "route.params.id = '6'", 'accent'],
        ],
      },
      second: {
        label: 'Adresse mit Query',
        parts: [
          ['/', 'Pfad', '', ''],
          ['?q=säge', 'Query', 'route.query.q', 'violet'],
          ['&category=Werkzeug', 'Query', 'route.query.category', 'violet'],
          ['&sort=deposit', 'Query', 'route.query.sort', 'violet'],
        ],
      },
    },
    tree: {
      title: 'Die Routen der Fallbeispiel-App',
      desc:
        'Ein Baum mit App und ihrer RouterView oben. Darunter hängen die Routen / mit CatalogView, /items/:id mit ItemView, /favorites ' +
        'mit FavoritesView, ' +
        '/association mit AssociationView, /login mit LoginView, die Catch-all-Route mit NotFoundView und /team mit TeamLayout. ' +
        'TeamLayout hat eine eigene RouterView mit den Kindrouten für die Ausleihen und die Rückgaben. ' +
        'Die Karte von /team trägt die Marke nur Team, die drei Karten des Teams sind gestrichelt, weil sie erst bei Bedarf laden, ' +
        'und neben der Catch-all-Route steht, dass sie alle anderen Adressen fängt.',
      root: ['App', 'RouterView'],
      routes: [
        ['CatalogView', '/'],
        ['ItemView', '/items/:id(\\d+)'],
        ['FavoritesView', '/favorites'],
        ['AssociationView', '/association'],
        ['LoginView', '/login'],
        ['NotFoundView', '/:pathMatch(.*)*'],
      ],
      team: ['TeamLayout', '/team', 'nur Team'],
      children: [
        ['TeamLoansView', "''", 'Ausleihen'],
        ['TeamReturnsView', 'returns', 'Rückgaben'],
      ],
      lazy: 'gestrichelt, lädt erst bei Bedarf',
      catchAll: 'fängt alle anderen Adressen',
    },
    flow: {
      title: 'Der Ablauf einer Navigation',
      desc:
        'Eine Folge von oben nach unten in zwei Bändern. Eine Navigation beginnt mit einem RouterLink oder router.push. ' +
        'Im Band der Guards laufen onBeforeRouteLeave in der Seite, die man verlässt, beforeEach für jede Navigation, ' +
        'beforeEnter nur beim Betreten einer Route, das Laden der Komponenten und beforeResolve. ' +
        'Im zweiten Band ist die Navigation bestätigt, afterEach läuft, und das DOM zeigt die neue Seite. ' +
        'Rechts führen Pfeile von einer Klammer um die Guards zu zwei Karten. Jeder Guard bricht die Navigation mit false ab und ' +
        'leitet mit einer Route auf eine neue Navigation um.',
      start: ['Navigation beginnt', 'RouterLink, router.push'],
      guards: 'Guards',
      guardSteps: [
        ['onBeforeRouteLeave', 'in der Seite, die man verlässt', 'shield'],
        ['beforeEach', 'global, bei jeder Navigation', 'shield'],
        ['beforeEnter', 'nur beim Betreten der Route', 'shield'],
        ['Komponenten laden', 'Routen mit import()', 'code'],
        ['beforeResolve', 'global, kurz vor dem Bestätigen', 'shield'],
      ],
      confirmed: 'Bestätigt',
      confirmedSteps: [
        ['Navigation bestätigt', 'die Adresse ändert sich', 'check'],
        ['afterEach', 'Titel, Fokus, hält nichts mehr auf', 'flag'],
        ['DOM aktualisiert', 'die neue Seite erscheint', 'browser'],
      ],
      cancel: ['Navigation abgebrochen', 'return false'],
      redirect: ['Umleitung, neue Navigation', 'return { name: … }'],
    },
  },
  en: {
    url: {
      title: 'Parts of an address',
      desc:
        'Two addresses in two bands, taken apart. Below each part a bracket carries its name. ' +
        'At the top /items/6, where /items/ is the fixed part of the route /items/:id and 6 is the param that route.params.id returns ' +
        'as a string. ' +
        'At the bottom /?q=saw&category=Tools&sort=deposit, where / is the path, and the query consists of q, category and sort, ' +
        'returned by route.query.q, route.query.category and route.query.sort.',
      first: {
        label: 'Address with a param',
        parts: [
          ['/items/', 'fixed part of the route', '/items/:id', ''],
          ['6', 'param', "route.params.id = '6'", 'accent'],
        ],
      },
      second: {
        label: 'Address with a query',
        parts: [
          ['/', 'path', '', ''],
          ['?q=saw', 'query', 'route.query.q', 'violet'],
          ['&category=Tools', 'query', 'route.query.category', 'violet'],
          ['&sort=deposit', 'query', 'route.query.sort', 'violet'],
        ],
      },
    },
    tree: {
      title: 'The routes of the case app',
      desc:
        'A tree with App and its RouterView at the top. Below it hang the routes / with CatalogView, /items/:id with ItemView, ' +
        '/favorites with FavoritesView, ' +
        '/association with AssociationView, /login with LoginView, the catch-all route with NotFoundView and /team with TeamLayout. ' +
        'TeamLayout has a RouterView of its own with the child routes for loans and returns. ' +
        'The card of /team carries the tag team only, the three cards of the team are dashed because they load on demand, ' +
        'and next to the catch-all route it says that it catches every other address.',
      root: ['App', 'RouterView'],
      routes: [
        ['CatalogView', '/'],
        ['ItemView', '/items/:id(\\d+)'],
        ['FavoritesView', '/favorites'],
        ['AssociationView', '/association'],
        ['LoginView', '/login'],
        ['NotFoundView', '/:pathMatch(.*)*'],
      ],
      team: ['TeamLayout', '/team', 'team only'],
      children: [
        ['TeamLoansView', "''", 'loans'],
        ['TeamReturnsView', 'returns', 'returns'],
      ],
      lazy: 'dashed, loads on demand',
      catchAll: 'catches every other address',
    },
    flow: {
      title: 'The navigation flow',
      desc:
        'A sequence from top to bottom in two bands. A navigation starts with a RouterLink or router.push. ' +
        'In the band of the guards, onBeforeRouteLeave runs in the page being left, beforeEach for every navigation, ' +
        'beforeEnter only when a route is entered, the components are loaded and beforeResolve runs. ' +
        'In the second band the navigation is confirmed, afterEach runs and the DOM shows the new page. ' +
        'On the right, arrows lead from a bracket around the guards to two cards. Every guard cancels the navigation with false and ' +
        'redirects to a new navigation with a route.',
      start: ['Navigation starts', 'RouterLink, router.push'],
      guards: 'Guards',
      guardSteps: [
        ['onBeforeRouteLeave', 'in the page being left', 'shield'],
        ['beforeEach', 'global, on every navigation', 'shield'],
        ['beforeEnter', 'only when entering the route', 'shield'],
        ['Components load', 'routes with import()', 'code'],
        ['beforeResolve', 'global, right before confirming', 'shield'],
      ],
      confirmed: 'Confirmed',
      confirmedSteps: [
        ['Navigation confirmed', 'the address changes', 'check'],
        ['afterEach', 'title, focus, stops nothing', 'flag'],
        ['DOM updated', 'the new page appears', 'browser'],
      ],
      cancel: ['Navigation cancelled', 'return false'],
      redirect: ['Redirect, new navigation', 'return { name: … }'],
    },
  },
};

// Width of a text in the monospace font, the address and its parts are set in it
const mono = (text) => measure(text, SIZE.code, { mono: true });

/**
 * One address taken apart. Every part sits over a bracket as wide as its column, the name of the
 * part and the code that reads it follow below, so a long code name gets room of its own.
 */
function address(x, y, parts) {
  const body = [];
  let left = x;
  for (const [part, name, code, tone] of parts) {
    const width = Math.ceil(Math.max(mono(part), measure(name, SIZE.small, { bold: true }), code ? mono(code) : 0)) + 20;
    const centre = left + width / 2;
    const options = tone === 'accent' ? { accent: true } : tone ? { tone } : {};
    body.push(
      note(centre, y, part, 'middle', { code: true }),
      line([[left + 3, y + 8], [left + 3, y + 14], [left + width - 3, y + 14], [left + width - 3, y + 8]], options),
      line([[centre, y + 14], [centre, y + 21]], options),
      heading(centre, y + 36, name, 'middle'),
    );
    if (code) body.push(note(centre, y + 52, code, 'middle', { code: true }));
    left += width + 4;
  }
  return { body, right: left - 4 };
}

function urlParts(lang) {
  const t = TEXT[lang].url;
  const id = `p6c2-url-${lang}`;
  const body = [];
  const height = 128;
  [t.first, t.second].forEach((group, index) => {
    const top = 16 + index * (height + 16);
    const parts = address(32, top + 60, group.parts);
    if (parts.right > WIDTH - 32) throw new Error(`${id}: the parts of the address need ${parts.right} px.`);
    // The whole address stays readable in one piece beside the name of the band
    const whole = group.parts.map(([part]) => part).join('');
    const after = 32 + labelWidth(group.label) + 12;
    body.push(
      band(16, top, WIDTH - 32, height, index + 1),
      label(32, top + 24, group.label, 'start', index ? { tone: 'blue' } : {}),
      fitted(after, top + 24, whole, WIDTH - 32 - after, 'start', { code: true }),
      ...parts.body,
    );
  });
  return figure({ id, width: WIDTH, height: 16 + 2 * height + 16 + 16, title: t.title, desc: t.desc, body });
}

/** A card with an icon and a tag at its right border, the title has to stay clear of the tag */
function tagged(x, y, w, h, title, sub, text, options) {
  const tw = tagWidth(text);
  room(title, w - ICON_SPACE - tw - 2 * PADDING, { size: SIZE.title, bold: true });
  room(sub, w - ICON_SPACE - tw - 2 * PADDING, { mono: true });
  return [tile(x, y, w, h, title, sub, { ...options, code: true }), tag(x + w - PADDING - tw, y + h / 2 - 9, text)].join('\n');
}

function routeTree(lang) {
  const t = TEXT[lang].tree;
  const id = `p6c3-tree-${lang}`;
  const h = 44;
  const step = h + 12;
  const root = { x: 16, y: 16, w: 228 };
  const bus = root.y + h + 20;
  const first = bus + 16;
  const left = { trunk: 36, x: 56, w: 248 };
  const right = { trunk: 332, x: 352, w: WIDTH - 16 - 352 };
  const child = { trunk: 376, x: 396, w: WIDTH - 16 - 396 };
  const rowY = (row) => first + row * step;
  const body = [];
  // The trunk of App reaches both columns, a branch leads to every card
  const lastLeft = rowY(t.routes.length - 1) + h / 2;
  body.push(
    tile(root.x, root.y, root.w, h, ...t.root, { accent: true, code: true, icon: 'block' }),
    line([[left.trunk, root.y + h + 1.5], [left.trunk, lastLeft]]),
    line([[left.trunk, bus], [right.trunk, bus], [right.trunk, rowY(0) + h / 2]]),
  );
  t.routes.forEach(([component, path], row) => {
    const y = rowY(row);
    body.push(
      line([[left.trunk, y + h / 2], [left.x, y + h / 2]]),
      tile(left.x, y, left.w, h, component, path, { code: true, icon: 'block' }),
    );
  });
  // The catch-all route is the last one, its note stands right of it
  const catchY = rowY(t.routes.length - 1);
  body.push(fitted(left.x + left.w + 16, catchY + h / 2 + 4, t.catchAll, WIDTH - 16 - (left.x + left.w + 16) - 8));
  // The team area with its own RouterView and two children, all of them load on demand, so they are
  // dashed cards, which the chapter refers to
  const [teamName, teamPath, teamTag] = t.team;
  body.push(
    line([[right.trunk, rowY(0) + h / 2], [right.x, rowY(0) + h / 2]]),
    tagged(right.x, rowY(0), right.w, h, teamName, teamPath, teamTag, { icon: 'lock', dashed: true }),
    line([[child.trunk, rowY(0) + h + 1.5], [child.trunk, rowY(2) + h / 2]]),
  );
  t.children.forEach(([component, path, text], index) => {
    const y = rowY(index + 1);
    body.push(
      line([[child.trunk, y + h / 2], [child.x, y + h / 2]]),
      tagged(child.x, y, child.w, h, component, path, text, { icon: 'block', dashed: true }),
    );
  });
  body.push(placeholder(right.x, rowY(3) + 6, right.w, 32, t.lazy));
  return figure({ id, width: WIDTH, height: rowY(t.routes.length - 1) + h + 18, title: t.title, desc: t.desc, body });
}

function guardFlow(lang) {
  const t = TEXT[lang].flow;
  const id = `p6c4-flow-${lang}`;
  const x = 32;
  const w = 300;
  const h = 44;
  const gap = 16;
  const head = 32;
  // Every arrow of the flow runs down the middle of the cards, past the names of the bands
  const centre = x + w / 2;
  const body = [];
  const steps = [{ y: 16, card: tile(x, 16, w, h, ...t.start, { icon: 'cursor' }) }];
  let y = 16 + h + 22;
  [
    [t.guards, t.guardSteps, 2],
    [t.confirmed, t.confirmedSteps, 1],
  ].forEach(([name, group, level], index) => {
    room(name.toUpperCase(), centre - 10 - x, { size: SIZE.label, bold: true });
    const height = head + group.length * h + (group.length - 1) * gap + 12;
    body.push(band(16, y, WIDTH - 32, height, level), label(x, y + 22, name, 'start', index === 0 ? { tone: 'blue' } : {}));
    group.forEach(([title, sub, icon], row) => {
      const top = y + head + row * (h + gap);
      // Loading the components is a step of its own between the guards, not a guard
      const options = { icon, ...(icon === 'code' ? { tone: 'violet' } : {}) };
      steps.push({ y: top, card: tile(x, top, w, h, title, sub, options) });
    });
    y += height + 14;
  });
  steps.slice(1).forEach((current, index) => {
    body.push(arrow(id, [[centre, steps[index].y + h + 1.5], [centre, current.y - 4]]));
  });
  // A bracket on the right of the guards, every one of them can stop or redirect the navigation
  const guardTop = steps[1].y + h / 2;
  const guardBottom = steps[5].y + h / 2;
  const bracket = x + w + 18;
  const middle = (guardTop + guardBottom) / 2;
  const outX = 412;
  const outW = WIDTH - 32 - outX;
  const cancelY = middle - 10 - h;
  const redirectY = middle + 10;
  body.push(
    line([[x + w + 8, guardTop], [bracket, guardTop], [bracket, guardBottom], [x + w + 8, guardBottom]], { accent: true }),
    arrow(id, [[bracket, cancelY + h / 2], [outX - 4, cancelY + h / 2]], { accent: true }),
    arrow(id, [[bracket, redirectY + h / 2], [outX - 4, redirectY + h / 2]], { accent: true }),
    tile(outX, cancelY, outW, h, ...t.cancel, { code: true, icon: 'cross' }),
    tile(outX, redirectY, outW, h, ...t.redirect, { code: true, icon: 'signpost' }),
    ...steps.map((step) => step.card),
  );
  return figure({ id, width: WIDTH, height: y - 14 + 16, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) {
  save(lang, 'p6c2-url-parts', urlParts(lang));
  save(lang, 'p6c3-route-tree', routeTree(lang));
  save(lang, 'p6c4-guard-flow', guardFlow(lang));
}
