/**
 * Figures of part 4, components. Writes one SVG per language into site/src/assets/figures/<lang>/.
 *
 *   node figures/components.mjs
 */
import {
  arrow,
  band,
  figure,
  fitted,
  heading,
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
  strip,
  tile,
  WIDTH,
} from './diagram.mjs';

const TEXT = {
  de: {
    tree: {
      title: 'Der Baum der Komponenten aus dem Entwurf',
      desc:
        'Links ein Entwurf der Seite mit dem Katalog. Der Kopf heisst AppHeader, das Suchfeld SearchBar, ' +
        'die Auswahl der Kategorie CategoryFilter, die Liste ItemList mit einer ItemCard für jedes Ding und der Fuss AppFooter. ' +
        'Rechts der Baum der ganzen App. App enthält AppHeader, CatalogView, ItemView und AppFooter. ' +
        'CatalogView enthält SearchBar, CategoryFilter und ItemList mit ItemCard, ItemView enthält ReservationForm und BaseDialog, ' +
        'AppFooter enthält OpeningHours. App besitzt Katalog, Favoriten, Suchtext und Kategorie, ReservationForm die Anfrage.',
      wireframe: 'Entwurf des Katalogs',
      tree: 'Baum der Komponenten',
      brand: 'Lorraine Commons',
      search: 'Suchen',
      category: 'Kategorie',
      items: ['Bohrmaschine', 'Zelt für vier', 'Raclette-Ofen'],
      footer: 'Öffnungszeiten',
      owns: 'besitzt Katalog, Favoriten, Suchtext und Kategorie',
      formOwns: 'besitzt die Anfrage',
    },
    flow: {
      title: 'Props fliessen von der Eltern- zur Kindkomponente',
      desc:
        'Oben steht die Komponente App, der die Daten gehören. Drei Pfeile führen nach unten zu drei Karten der Komponente ItemCard. ' +
        'An jedem Pfeil stehen die Props, die App übergibt, zum Beispiel name gleich Bohrmaschine und category gleich Werkzeug. ' +
        'Jede Karte zeigt nur, was sie bekommen hat. Ein Pfeil zurück nach oben fehlt, die Daten fliessen nur von oben nach unten.',
      owns: 'besitzt die Daten',
      cards: [
        ['Bohrmaschine', 'Werkzeug'],
        ['Zelt für vier', 'Camping'],
        ['Raclette-Ofen', 'Küche'],
      ],
      rule: 'Props fliessen nur nach unten, nie zurück nach oben.',
    },
    events: {
      title: 'Props nach unten, Events nach oben',
      desc:
        'Oben steht App. Links darunter ItemCard, App gibt ihr mit Props den Namen und die Verfügbarkeit, ' +
        'die Karte meldet mit dem Event reserve die id zurück. Rechts darunter SearchBar, App gibt ihr den Wert modelValue, ' +
        'das Suchfeld meldet Änderungen mit dem Event update:modelValue. v-model verbindet beides.',
      owns: 'besitzt die Daten',
      props: 'Props',
      events: 'Events',
      model: 'v-model verbindet beide Richtungen',
      rule: 'Daten fliessen nach unten, Meldungen nach oben.',
    },
    slots: {
      title: 'Inhalte füllen die Slots einer Komponente',
      desc:
        'Links das Template der Elternkomponente mit BaseDialog. Sie füllt den Slot title mit dem Titel, ' +
        'den Standard-Slot mit dem Text der Anfrage und den Slot actions mit einem Knopf. ' +
        'Rechts das Template von BaseDialog mit den drei Stellen slot name title, slot und slot name actions. ' +
        'Pfeile verbinden jeden Inhalt mit seinem Slot.',
      parent: 'Elternkomponente',
      child: 'Kindkomponente',
      heading: 'Anfrage prüfen',
      body: 'Bohrmaschine, 18. bis 21.11.',
      button: 'Bestätigen',
    },
    provide: {
      title: 'Props durchreichen oder provide und inject',
      desc:
        'Links reicht App das Mitglied als Prop an ItemView weiter und ItemView an ReservationForm, ' +
        'obwohl ItemView es selbst nicht braucht. ' +
        'Rechts stellt App das Mitglied mit provide bereit, und ReservationForm holt es mit inject, ohne dass ItemView davon weiss.',
      drilling: 'Props durchreichen',
      injecting: 'provide und inject',
      notNeeded: 'braucht member nicht',
    },
  },
  en: {
    tree: {
      title: 'The tree of components drawn from a wireframe',
      desc:
        'On the left a wireframe of the catalog page. The header is AppHeader, the search field SearchBar, ' +
        'the category select CategoryFilter, the list ItemList with an ItemCard for every thing and the footer AppFooter. ' +
        'On the right the tree of the whole app. App contains AppHeader, CatalogView, ItemView and AppFooter. ' +
        'CatalogView contains SearchBar, CategoryFilter and ItemList with ItemCard, ItemView contains ReservationForm and BaseDialog, ' +
        'AppFooter contains OpeningHours. App owns catalog, favorites, search text and category, ReservationForm the request.',
      wireframe: 'Catalog wireframe',
      tree: 'Component tree',
      brand: 'Lorraine Commons',
      search: 'Search',
      category: 'Category',
      items: ['Drill', 'Tent for four', 'Raclette oven'],
      footer: 'Opening hours',
      owns: 'owns catalog, favorites, search text and category',
      formOwns: 'owns the request',
    },
    flow: {
      title: 'Props flow from the parent to the child component',
      desc:
        'At the top is the component App, which owns the data. Three arrows lead down to three cards of the component ItemCard. ' +
        'Each arrow carries the props App passes, for example name equals Drill and category equals Tools. ' +
        'Each card shows only what it received. There is no arrow back up, the data flow only downward.',
      owns: 'owns the data',
      cards: [
        ['Drill', 'Tools'],
        ['Tent for four', 'Camping'],
        ['Raclette oven', 'Kitchen'],
      ],
      rule: 'Props flow only downward, never back up.',
    },
    events: {
      title: 'Props down, events up',
      desc:
        'App is at the top. Below it on the left is ItemCard, App gives it the name and the availability through props, ' +
        'and the card reports the id back with the event reserve. ' +
        'Below it on the right is SearchBar, App gives it the value modelValue, ' +
        'and the search field reports changes with the event update:modelValue. v-model connects both.',
      owns: 'owns the data',
      props: 'Props',
      events: 'Events',
      model: 'v-model connects both directions',
      rule: 'Data flow down, messages flow up.',
    },
    slots: {
      title: 'Content fills the slots of a component',
      desc:
        'On the left the template of the parent component with BaseDialog. It fills the slot title with the title, ' +
        'the default slot with the text of the request and the slot actions with a button. ' +
        'On the right the template of BaseDialog with the three places slot name title, slot and slot name actions. ' +
        'Arrows connect each piece of content with its slot.',
      parent: 'Parent component',
      child: 'Child component',
      heading: 'Check the request',
      body: 'Drill, Nov 18 to 21',
      button: 'Confirm',
    },
    provide: {
      title: 'Passing props down or provide and inject',
      desc:
        'On the left, App passes the member as a prop to ItemView, and ItemView passes it on to ReservationForm, ' +
        'although ItemView does not need it itself. ' +
        'On the right, App provides the member with provide, and ReservationForm gets it with inject, without ItemView knowing about it.',
      drilling: 'Passing props down',
      injecting: 'provide and inject',
      notNeeded: 'does not need member',
    },
  },
};

/** A card with one centred line of code, for template content that moves into a slot */
function codeCard(x, y, w, h, text) {
  room(text, w - 2 * PADDING, { mono: true });
  return [
    `<rect class="d-shadow" x="${x}" y="${y + 1.5}" width="${w}" height="${h}" rx="10"/>`,
    `<rect class="d-tile" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`,
    note(x + w / 2, y + h / 2 + 4, text, 'middle', { code: true }),
  ].join('\n');
}

/** The label of a band with a file name at its right end, both on the first line of the band */
function bandHead(x, w, text, file, options = {}) {
  const needed = labelWidth(text) + 16 + measure(file, SIZE.code, { mono: true });
  if (needed > w - 32) throw new Error(`"${text}" and "${file}" need about ${Math.ceil(needed)} px but have only ${w - 32} px.`);
  return [label(x + 16, 40, text, 'start', options), note(x + w - 16, 40, file, 'end', { code: true })].join('\n');
}

// The components of the case app with their depth in the tree, in the order of the indented tree
const TREE = [
  ['App', 0],
  ['AppHeader', 1],
  ['CatalogView', 1],
  ['SearchBar', 2],
  ['CategoryFilter', 2],
  ['ItemList', 2],
  ['ItemCard', 3],
  ['ItemView', 1],
  ['ReservationForm', 2],
  ['BaseDialog', 2],
  ['AppFooter', 1],
  ['OpeningHours', 2],
];

const TOP = 56;
const ROW_H = 30;
const OWNER_H = 44;
const ROW_GAP = 6;
const INDENT = 28;
const NODE_W = 160;
const WIRE_W = 264;
const WIRE_H = 56;

function componentTree(lang) {
  const t = TEXT[lang].tree;
  const id = `p4c1-tree-${lang}`;
  const wire = { x: 16, w: WIRE_W };
  const tree = { x: 16 + WIRE_W + 16, w: WIDTH - 16 - (16 + WIRE_W + 16) };
  const end = tree.x + tree.w - 16;

  // The two components that own state get a second line that names it, App spans the band as the root
  const owns = { App: t.owns, ReservationForm: t.formOwns };
  let top = TOP;
  const rows = TREE.map(([name, depth]) => {
    const x = tree.x + 16 + depth * INDENT;
    const row = { name, depth, x, y: top, w: depth ? NODE_W : end - x, h: owns[name] ? OWNER_H : ROW_H };
    top += row.h + ROW_GAP;
    return row;
  });
  const contentH = top - ROW_GAP - TOP;
  const bandH = contentH + 56;
  const body = [
    band(wire.x, 16, wire.w, bandH, 1),
    label(wire.x + 16, 40, t.wireframe),
    band(tree.x, 16, tree.w, bandH, 2),
    label(tree.x + 16, 40, t.tree, 'start', { tone: 'blue' }),
  ];

  // The wireframe of the catalog page, every part shows what the page shows and the component that draws it
  const inner = wire.x + 16;
  const innerW = wire.w - 32;
  const gap = 16;
  const filterW = 124;
  let y = TOP;
  body.push(tile(inner, y, innerW, WIRE_H, t.brand, 'AppHeader', { code: true }));
  y += WIRE_H + gap;
  body.push(tile(inner, y, innerW - filterW - 8, WIRE_H, t.search, 'SearchBar', { code: true }));
  body.push(tile(inner + innerW - filterW, y, filterW, WIRE_H, t.category, 'CategoryFilter', { code: true }));
  y += WIRE_H + gap;
  // The list takes the height the tree leaves, so both bands end on the same line
  const listH = contentH - 3 * (WIRE_H + gap);
  const itemGap = (listH - 32 - 14 - t.items.length * WIRE_H) / (t.items.length - 1);
  body.push(band(inner, y, innerW, listH, 4), fitted(inner + 12, y + 21, 'ItemList', innerW - 24, 'start', { code: true }));
  t.items.forEach((name, index) => {
    body.push(tile(inner + 12, y + 32 + index * (WIRE_H + itemGap), innerW - 24, WIRE_H, name, 'ItemCard', { code: true }));
  });
  y += listH + gap;
  body.push(tile(inner, y, innerW, WIRE_H, t.footer, 'AppFooter', { code: true }));

  // The indented tree, each line runs from a parent down to its children
  const parents = rows.map((row, index) => {
    let parent = index - 1;
    while (parent >= 0 && rows[parent].depth >= row.depth) parent--;
    return parent;
  });
  rows.forEach((row, index) => {
    const children = rows.filter((_, child) => parents[child] === index);
    if (!children.length) return;
    const trunk = row.x + INDENT / 2;
    const last = children[children.length - 1];
    // The lines start and end under the cards, the cards drawn later cover their ends
    body.push(line([[trunk, row.y + row.h / 2], [trunk, last.y + last.h / 2], [last.x + 8, last.y + last.h / 2]]));
    children.slice(0, -1).forEach((child) => body.push(line([[trunk, child.y + child.h / 2], [child.x + 8, child.y + child.h / 2]])));
  });
  for (const row of rows) {
    body.push(tile(row.x, row.y, row.w, row.h, row.name, owns[row.name] ?? '', { icon: owns[row.name] ? 'database' : '' }));
  }
  return figure({ id, width: WIDTH, height: 16 + bandH + 16, title: t.title, desc: t.desc, body });
}

function propsFlow(lang) {
  const t = TEXT[lang].flow;
  const id = `p4c2-flow-${lang}`;
  const parent = { x: 220, y: 16, w: 240, h: 52 };
  const bus = parent.y + parent.h + 24;
  const cardY = bus + 64;
  const cardW = 200;
  const cardH = 52;
  const cards = t.cards.map(([name, category], index) => ({ x: 16 + index * (cardW + 24), name, category }));
  const from = parent.x + parent.w / 2;
  const mid = (bus + cardY) / 2;
  const body = [];
  cards.forEach((card, index) => {
    // The arrow lands above the icon of the card, its props start where the text of the card starts
    const drop = card.x + 21;
    const limit = index < cards.length - 1 ? cards[index + 1].x + 21 - 10 : WIDTH - 16;
    body.push(
      arrow(id, [[from, parent.y + parent.h + 1.5], [from, bus], [drop, bus], [drop, cardY - 4]], { accent: true }),
      fitted(card.x + 40, mid - 3, `name="${card.name}"`, limit - card.x - 40, 'start', { code: true }),
      fitted(card.x + 40, mid + 13, `category="${card.category}"`, limit - card.x - 40, 'start', { code: true }),
    );
  });
  body.push(tile(parent.x, parent.y, parent.w, parent.h, 'App.vue', t.owns, { icon: 'database' }));
  cards.forEach((card) => body.push(tile(card.x, cardY, cardW, cardH, 'ItemCard.vue', `${card.name}, ${card.category}`, { icon: 'box' })));
  const stripY = cardY + cardH + 24;
  body.push(strip(16, stripY, WIDTH - 32, 30, t.rule));
  return figure({ id, width: WIDTH, height: stripY + 30 + 16, title: t.title, desc: t.desc, body });
}

function propsEvents(lang) {
  const t = TEXT[lang].events;
  const id = `p4c3-events-${lang}`;
  const parent = { x: 16, y: 16, w: WIDTH - 32, h: 52 };
  const childY = parent.y + parent.h + 92;
  const cardW = 316;
  const cardH = 52;
  const children = [
    { x: 16, name: 'ItemCard.vue', sub: '', icon: 'box', down: ':name, :available', up: '@reserve(id)' },
    { x: WIDTH - 16 - cardW, name: 'SearchBar.vue', sub: t.model, icon: 'search', down: 'modelValue', up: 'update:modelValue' },
  ];
  const mid = (parent.y + parent.h + childY) / 2;
  const body = [];
  for (const child of children) {
    // Props come down above the icon of the card and events go up from its middle, each label to the right of its arrow
    const down = child.x + 21;
    const up = child.x + 176;
    const text = child.x + 40;
    room(t.props, up - 10 - text, { size: SIZE.small, bold: true });
    room(t.events, child.x + cardW - up - 10, { size: SIZE.small, bold: true });
    body.push(
      arrow(id, [[down, parent.y + parent.h + 1.5], [down, childY - 4]], { accent: true }),
      heading(text, mid - 3, t.props),
      fitted(text, mid + 13, child.down, up - 10 - text, 'start', { code: true }),
      arrow(id, [[up, childY], [up, parent.y + parent.h + 5.5]], { tone: 'violet' }),
      heading(up + 10, mid - 3, t.events),
      fitted(up + 10, mid + 13, child.up, child.x + cardW - up - 10, 'start', { code: true }),
    );
  }
  body.push(tile(parent.x, parent.y, parent.w, parent.h, 'App.vue', t.owns, { icon: 'database' }));
  children.forEach((child) => body.push(tile(child.x, childY, cardW, cardH, child.name, child.sub, { icon: child.icon })));
  const stripY = childY + cardH + 24;
  body.push(strip(16, stripY, WIDTH - 32, 30, t.rule));
  return figure({ id, width: WIDTH, height: stripY + 30 + 16, title: t.title, desc: t.desc, body });
}

// Both templates line by line, each line of content in the parent faces the slot it fills
const CODE_ROW = 22;
const BOX_ROW = 44;
const STEP = 16;

function slots(lang) {
  const t = TEXT[lang].slots;
  const id = `p4c4-slots-${lang}`;
  const columns = [
    {
      x: 16,
      level: 1,
      head: t.parent,
      file: 'App.vue',
      rows: [
        [0, 'code', '<BaseDialog>'],
        [1, 'code', '<template #title>'],
        [2, 'fill', t.heading],
        [1, 'code', '</template>'],
        [1, 'fill', t.body],
        [1, 'code', '<template #actions>'],
        [2, 'fill', `<button>${t.button}</button>`],
        [1, 'code', '</template>'],
        [0, 'code', '</BaseDialog>'],
      ],
    },
    {
      x: 364,
      level: 2,
      head: t.child,
      file: 'BaseDialog.vue',
      rows: [
        [0, 'code', '<div role="dialog">'],
        [1, 'code', '<h2>'],
        [2, 'slot', '<slot name="title" />'],
        [1, 'code', '</h2>'],
        [1, 'slot', '<slot />'],
        [1, 'code', '<div class="actions">'],
        [2, 'slot', '<slot name="actions" />'],
        [1, 'code', '</div>'],
        [0, 'code', '</div>'],
      ],
    },
  ];
  const w = 300;
  const tops = [];
  let y = TOP;
  for (const [, kind] of columns[0].rows) {
    tops.push(y);
    y += kind === 'code' ? CODE_ROW : BOX_ROW;
  }
  const bottom = y + 12;
  const body = [];
  const fills = [];
  const outlets = [];
  columns.forEach((column, index) => {
    const end = column.x + w - 16;
    body.push(band(column.x, 16, w, bottom - 16, column.level));
    body.push(bandHead(column.x, w, column.head, column.file, index ? { tone: 'blue' } : {}));
    column.rows.forEach(([depth, kind, text], row) => {
      const x = column.x + 16 + depth * STEP;
      if (kind === 'code') body.push(fitted(x, tops[row] + 15, text, end - x, 'start', { code: true }));
      if (kind === 'fill') {
        body.push(codeCard(x, tops[row] + 4, end - x, BOX_ROW - 8, text));
        fills.push({ x: end, y: tops[row] + BOX_ROW / 2 });
      }
      if (kind === 'slot') {
        body.push(placeholder(x, tops[row] + 4, end - x, BOX_ROW - 8, text, { code: true }));
        outlets.push({ x, y: tops[row] + BOX_ROW / 2 });
      }
    });
  });
  fills.forEach((fill, index) => body.push(arrow(id, [[fill.x, fill.y], [outlets[index].x - 4, outlets[index].y]], { accent: true })));
  return figure({ id, width: WIDTH, height: bottom + 16, title: t.title, desc: t.desc, body });
}

function provideInject(lang) {
  const t = TEXT[lang].provide;
  const id = `p4c5-provide-${lang}`;
  const w = 316;
  const cardW = 236;
  const cardH = 52;
  const rows = [0, 1, 2].map((index) => TOP + index * (cardH + 40));
  const bottom = rows[2] + cardH + 16;
  const body = [];

  // With props every component on the way takes the member and hands it on
  const left = { x: 16, card: 32 };
  body.push(band(left.x, 16, w, bottom - 16, 1), label(left.x + 16, 40, t.drilling));
  const centre = left.card + cardW / 2;
  for (const index of [0, 1]) {
    const from = rows[index] + cardH;
    const to = rows[index + 1];
    body.push(
      arrow(id, [[centre, from + 1.5], [centre, to - 4]]),
      fitted(centre + 10, (from + to) / 2 + 4, ':member', left.x + w - 16 - centre - 10, 'start', { code: true }),
    );
  }
  body.push(
    tile(left.card, rows[0], cardW, cardH, 'App.vue', '', { icon: 'block' }),
    tile(left.card, rows[1], cardW, cardH, 'ItemView.vue', t.notNeeded, { icon: 'block' }),
    tile(left.card, rows[2], cardW, cardH, 'ReservationForm.vue', '', { icon: 'block' }),
  );

  // With provide and inject the member passes ItemView by, the plain lines only show the tree
  const right = { x: 348, card: 364 };
  body.push(band(right.x, 16, w, bottom - 16, 2), label(right.x + 16, 40, t.injecting, 'start', { tone: 'blue' }));
  const middle = right.card + cardW / 2;
  for (const index of [0, 1]) body.push(line([[middle, rows[index] + cardH], [middle, rows[index + 1]]]));
  const edge = right.card + cardW;
  const bend = edge + 28;
  const [provided, injected] = [rows[0] + cardH / 2, rows[2] + cardH / 2];
  body.push(arrow(id, [[edge, provided], [bend, provided], [bend, injected], [edge + 4, injected]], { accent: true }));
  body.push(
    tile(right.card, rows[0], cardW, cardH, 'App.vue', 'provide(memberKey, member)', { code: true, icon: 'plug' }),
    tile(right.card, rows[1], cardW, cardH, 'ItemView.vue', '', { icon: 'block' }),
    tile(right.card, rows[2], cardW, cardH, 'ReservationForm.vue', 'inject(memberKey)', { code: true, icon: 'plug' }),
  );
  return figure({ id, width: WIDTH, height: bottom + 16, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) {
  save(lang, 'p4c1-component-tree', componentTree(lang));
  save(lang, 'p4c2-props-flow', propsFlow(lang));
  save(lang, 'p4c3-props-events', propsEvents(lang));
  save(lang, 'p4c4-slots', slots(lang));
  save(lang, 'p4c5-provide-inject', provideInject(lang));
}
