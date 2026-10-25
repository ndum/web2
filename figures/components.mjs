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

import { sketch } from './sketch.mjs';

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

const MORE = {
  de: {
    tree: {
      title: 'Der Baum der Komponenten aus dem Entwurf',
      desc:
        'Links ein Entwurf der Seite mit dem Katalog. Der Kopf heisst AppHeader, das Suchfeld SearchBar, die Auswahl der Kategorie CategoryFilter, ' +
        'die Liste ItemList mit einer ItemCard für jedes Ding und der Fuss AppFooter. Rechts der Baum der ganzen App. ' +
        'App enthält AppHeader, CatalogView, ItemView und AppFooter. CatalogView enthält SearchBar, CategoryFilter und ItemList mit ItemCard, ' +
        'ItemView enthält ReservationForm und BaseDialog, AppFooter enthält OpeningHours. App besitzt Katalog, Favoriten, Suchtext und Kategorie, ReservationForm die Anfrage.',
      wireframe: { brand: 'Lorraine Commons', search: 'Suchen', category: 'Kategorie', cards: ['Bohrmaschine', 'Zelt für vier', 'Raclette-Ofen'], footer: 'Öffnungszeiten' },
      owns: ['besitzt Katalog, Favoriten,', 'Suchtext und Kategorie'],
      formOwns: 'besitzt die Anfrage',
    },
    events: {
      title: 'Props nach unten, Events nach oben',
      desc:
        'Oben steht App. Links darunter ItemCard, App gibt ihr mit Props den Namen und die Verfügbarkeit, die Karte meldet mit dem Event reserve die id zurück. ' +
        'Rechts darunter SearchBar, App gibt ihr den Wert modelValue, das Suchfeld meldet Änderungen mit dem Event update:modelValue. v-model verbindet beides.',
      parentSub: 'besitzt die Daten',
      props: 'Props',
      events: 'Events',
      model: 'v-model verbindet beide Richtungen',
      note: 'Daten fliessen nach unten, Meldungen nach oben.',
    },
    slots: {
      title: 'Inhalte füllen die Slots einer Komponente',
      desc:
        'Links das Template der Elternkomponente mit BaseDialog. Sie füllt den Slot title mit dem Titel, den Standard-Slot mit dem Text der Anfrage und den Slot actions mit einem Knopf. ' +
        'Rechts das Template von BaseDialog mit den drei Stellen slot name title, slot und slot name actions. Pfeile verbinden jeden Inhalt mit seinem Slot.',
      parent: 'App.vue füllt die Slots',
      child: 'BaseDialog.vue zeigt sie an',
      heading: 'Anfrage prüfen',
      body: 'Bohrmaschine, 18. bis 21.11.',
      button: 'Bestätigen',
    },
    provide: {
      title: 'Props durchreichen oder provide und inject',
      desc:
        'Links reicht App das Mitglied als Prop an ItemView weiter und ItemView an ReservationForm, obwohl ItemView es selbst nicht braucht. ' +
        'Rechts stellt App das Mitglied mit provide bereit, und ReservationForm holt es mit inject, ohne dass ItemView davon weiss.',
      drilling: 'Props durchreichen',
      injecting: 'provide und inject',
      notNeeded: 'braucht member nicht',
      provides: "provide(memberKey, member)",
      injects: "inject(memberKey)",
    },
  },
  en: {
    tree: {
      title: 'The tree of components drawn from a wireframe',
      desc:
        'On the left a wireframe of the catalog page. The header is AppHeader, the search field SearchBar, the category select CategoryFilter, ' +
        'the list ItemList with an ItemCard for every thing and the footer AppFooter. On the right the tree of the whole app. ' +
        'App contains AppHeader, CatalogView, ItemView and AppFooter. CatalogView contains SearchBar, CategoryFilter and ItemList with ItemCard, ' +
        'ItemView contains ReservationForm and BaseDialog, AppFooter contains OpeningHours. App owns catalog, favorites, search text and category, ReservationForm the request.',
      wireframe: { brand: 'Lorraine Commons', search: 'Search', category: 'Category', cards: ['Drill', 'Tent for four', 'Raclette oven'], footer: 'Opening hours' },
      owns: ['owns catalog, favorites,', 'search text and category'],
      formOwns: 'owns the request',
    },
    events: {
      title: 'Props down, events up',
      desc:
        'App is at the top. Below it on the left is ItemCard, App gives it the name and the availability through props, and the card reports the id back with the event reserve. ' +
        'Below it on the right is SearchBar, App gives it the value modelValue, and the search field reports changes with the event update:modelValue. v-model connects both.',
      parentSub: 'owns the data',
      props: 'props',
      events: 'events',
      model: 'v-model connects both directions',
      note: 'Data flow down, messages flow up.',
    },
    slots: {
      title: 'Content fills the slots of a component',
      desc:
        'On the left the template of the parent component with BaseDialog. It fills the slot title with the title, the default slot with the text of the request and the slot actions with a button. ' +
        'On the right the template of BaseDialog with the three places slot name title, slot and slot name actions. Arrows connect each piece of content with its slot.',
      parent: 'App.vue fills the slots',
      child: 'BaseDialog.vue shows them',
      heading: 'Check the request',
      body: 'Drill, Nov 18 to 21',
      button: 'Confirm',
    },
    provide: {
      title: 'Passing props down or provide and inject',
      desc:
        'On the left, App passes the member as a prop to ItemView, and ItemView passes it on to ReservationForm, although ItemView does not need it itself. ' +
        'On the right, App provides the member with provide, and ReservationForm gets it with inject, without ItemView knowing about it.',
      drilling: 'passing props down',
      injecting: 'provide and inject',
      notNeeded: 'does not need member',
      provides: "provide(memberKey, member)",
      injects: "inject(memberKey)",
    },
  },
};

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

// A label on a patch of page background, so an arrow can pass behind it
function label(x, y, text, code = false) {
  const width = text.length * (code ? 7.3 : 6.6) + 10;
  return [
    `<rect class="fig-label-bg" x="${x - width / 2}" y="${y - 13}" width="${width}" height="18" rx="3"/>`,
    `<text class="${code ? 'fig-code' : 'fig-sub'}" x="${x}" y="${y}" text-anchor="middle">${escape(text)}</text>`,
  ];
}

function componentTree(lang) {
  const t = MORE[lang].tree;
  const w = t.wireframe;
  const id = `p4c1-tree-${lang}`;
  const parts = [
    // The wireframe of the catalog page, each part labelled with its component
    `<rect class="fig-box" x="20" y="20" width="300" height="340" rx="8"/>`,
    `<rect class="fig-box fig-box-strong" x="30" y="30" width="280" height="36" rx="4"/>`,
    `<text class="fig-sub fig-strong" x="42" y="53">${escape(w.brand)}</text>`,
    `<text class="fig-code" x="302" y="53" text-anchor="end">AppHeader</text>`,
    `<rect class="fig-box" x="40" y="80" width="150" height="28" rx="4"/>`,
    `<text class="fig-sub" x="50" y="99">${escape(w.search)}</text>`,
    `<text class="fig-code" x="184" y="99" text-anchor="end">SearchBar</text>`,
    `<rect class="fig-box" x="198" y="80" width="112" height="28" rx="4"/>`,
    `<text class="fig-code" x="254" y="99" text-anchor="middle">CategoryFilter</text>`,
    `<rect class="fig-box" x="36" y="120" width="278" height="176" rx="4" stroke-dasharray="5 4"/>`,
    `<text class="fig-code" x="46" y="138">ItemList</text>`,
  ];
  w.cards.forEach((name, index) => {
    const top = 148 + index * 48;
    parts.push(
      `<rect class="fig-box" x="46" y="${top}" width="258" height="40" rx="4"/>`,
      `<text class="fig-sub fig-strong" x="58" y="${top + 25}">${escape(name)}</text>`,
      `<text class="fig-code" x="296" y="${top + 25}" text-anchor="end">ItemCard</text>`,
    );
  });
  parts.push(
    `<rect class="fig-box fig-box-strong" x="30" y="312" width="280" height="36" rx="4"/>`,
    `<text class="fig-sub" x="42" y="335">${escape(w.footer)}</text>`,
    `<text class="fig-code" x="302" y="335" text-anchor="end">AppFooter</text>`,
  );
  // The tree of the whole app, one line per component, indented by depth
  const tree = [
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
  const left = 360;
  const step = 26;
  const top = 44;
  tree.forEach(([name, depth], index) => {
    const x = left + depth * 26;
    const y = top + index * step;
    if (depth > 0) {
      // Find the parent line, the last line above with a smaller depth
      let parent = index - 1;
      while (tree[parent][1] >= depth) parent--;
      const parentX = left + tree[parent][1] * 26 + 6;
      const parentY = top + parent * step + 5;
      parts.push(`<path class="fig-arrow" d="M ${parentX} ${parentY} L ${parentX} ${y - 4} L ${x - 4} ${y - 4}" stroke-width="1.5"/>`);
    }
    parts.push(`<text class="fig-code${depth === 0 ? ' fig-strong' : ''}" x="${x}" y="${y}" style="font-size: 13px">${escape(name)}</text>`);
  });
  parts.push(
    `<text class="fig-sub fig-note" x="${left + 52}" y="${top - 4}">${escape(t.owns[0])}</text>`,
    `<text class="fig-sub fig-note" x="${left + 52}" y="${top + 12}">${escape(t.owns[1])}</text>`,
    `<text class="fig-sub fig-note" x="${left + 52 + 130}" y="${top + 8 * step}">${escape(t.formOwns)}</text>`,
  );
  return svg(id, 680, 370, t, parts);
}

function propsEvents(lang) {
  const t = MORE[lang].events;
  const id = `p4c3-events-${lang}`;
  const parts = [
    `<rect class="fig-box fig-box-strong" x="60" y="20" width="600" height="54" rx="10"/>`,
    `<text class="fig-text" x="360" y="44" text-anchor="middle">App.vue</text>`,
    `<text class="fig-sub" x="360" y="64" text-anchor="middle">${escape(t.parentSub)}</text>`,
  ];
  const children = [
    { x: 110, name: 'ItemCard.vue', down: ':name, :available', up: '@reserve(id)', note: t.note },
    { x: 420, name: 'SearchBar.vue', down: 'modelValue', up: 'update:modelValue', note: t.model },
  ];
  for (const child of children) {
    const down = child.x + 55;
    const up = child.x + 135;
    parts.push(
      `<rect class="fig-box" x="${child.x}" y="200" width="190" height="52" rx="10"/>`,
      `<text class="fig-text" x="${child.x + 95}" y="231" text-anchor="middle">${escape(child.name)}</text>`,
      // Props go down on the left, events come up on the right
      arrow(id, `M ${down} 76 L ${down} 196`),
      arrow(id, `M ${up} 198 L ${up} 78`),
      `<text class="fig-sub fig-strong" x="${down - 7}" y="126" text-anchor="end">${escape(t.props)}</text>`,
      `<text class="fig-code" x="${down - 7}" y="144" text-anchor="end">${escape(child.down)}</text>`,
      `<text class="fig-sub fig-strong" x="${up + 7}" y="126">${escape(t.events)}</text>`,
      `<text class="fig-code" x="${up + 7}" y="144">${escape(child.up)}</text>`,
      `<text class="fig-sub fig-note" x="${child.x + 95}" y="278" text-anchor="middle">${escape(child.note)}</text>`,
    );
  }
  return svg(id, 720, 292, t, parts);
}

function slots(lang) {
  const t = MORE[lang].slots;
  const id = `p4c4-slots-${lang}`;
  const parent = [
    '<BaseDialog>',
    '  <template #title>',
    `    ${t.heading}`,
    '  </template>',
    `  ${t.body}`,
    '  <template #actions>',
    `    <button>${t.button}</button>`,
    '  </template>',
    '</BaseDialog>',
  ];
  const child = ['<div role="dialog">', '  <h2>', '    <slot name="title" />', '  </h2>', '  <slot />', '  <div class="actions">', '    <slot name="actions" />', '  </div>', '</div>'];
  const top = 66;
  const step = 24;
  const parts = [
    `<text class="fig-text" x="20" y="30">${escape(t.parent)}</text>`,
    `<text class="fig-text" x="390" y="30">${escape(t.child)}</text>`,
    `<rect class="fig-box" x="20" y="42" width="290" height="${parent.length * step + 16}" rx="8"/>`,
    `<rect class="fig-box" x="390" y="42" width="270" height="${child.length * step + 16}" rx="8"/>`,
  ];
  parent.forEach((line, index) => {
    const filled = index === 2 || index === 4 || index === 6;
    parts.push(`<text class="fig-code${filled ? ' fig-strong' : ''}" x="32" y="${top + index * step}" xml:space="preserve">${escape(line)}</text>`);
  });
  child.forEach((line, index) => {
    const outlet = index === 2 || index === 4 || index === 6;
    parts.push(`<text class="fig-code${outlet ? ' fig-strong' : ''}" x="402" y="${top + index * step}" xml:space="preserve">${escape(line)}</text>`);
  });
  for (const index of [2, 4, 6]) {
    const y = top + index * step - 4;
    parts.push(arrow(id, `M 300 ${y} L 396 ${y}`));
  }
  return svg(id, 680, 66 + parent.length * step, t, parts);
}

function provideInject(lang) {
  const t = MORE[lang].provide;
  const id = `p4c5-provide-${lang}`;
  const parts = [];
  const columns = [
    { x: 30, heading: t.drilling, drilling: true },
    { x: 370, heading: t.injecting, drilling: false },
  ];
  for (const column of columns) {
    const boxes = [
      { name: 'App.vue', y: 50 },
      { name: 'ItemView.vue', y: 150 },
      { name: 'ReservationForm.vue', y: 250 },
    ];
    parts.push(`<text class="fig-text" x="${column.x}" y="30">${escape(column.heading)}</text>`);
    boxes.forEach((box, index) => {
      const strong = index !== 1;
      parts.push(
        `<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${column.x}" y="${box.y}" width="190" height="50" rx="8"/>`,
        `<text class="fig-text" x="${column.x + 95}" y="${box.y + 30}" text-anchor="middle">${escape(box.name)}</text>`,
      );
    });
    if (column.drilling) {
      parts.push(
        arrow(id, `M ${column.x + 95} 102 L ${column.x + 95} 146`),
        ...label(column.x + 95, 130, ':member', true),
        arrow(id, `M ${column.x + 95} 202 L ${column.x + 95} 246`),
        ...label(column.x + 95, 230, ':member', true),
        `<text class="fig-sub fig-note" x="${column.x + 200}" y="180">${escape(t.notNeeded)}</text>`,
      );
    } else {
      parts.push(
        `<text class="fig-code" x="${column.x}" y="118">${escape(t.provides)}</text>`,
        arrow(id, `M ${column.x + 200} 76 C ${column.x + 290} 120, ${column.x + 290} 230, ${column.x + 196} 272`),
        `<text class="fig-code" x="${column.x}" y="322">${escape(t.injects)}</text>`,
      );
    }
  }
  return svg(id, 680, 336, t, parts);
}

for (const lang of Object.keys(TEXT)) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'p4c2-props-flow.svg'), sketch(propsFlow(lang), 'p4c2-props-flow'));
  writeFileSync(join(folder, 'p4c1-component-tree.svg'), sketch(componentTree(lang), 'p4c1-component-tree'));
  writeFileSync(join(folder, 'p4c3-props-events.svg'), sketch(propsEvents(lang), 'p4c3-props-events'));
  writeFileSync(join(folder, 'p4c4-slots.svg'), sketch(slots(lang), 'p4c4-slots'));
  writeFileSync(join(folder, 'p4c5-provide-inject.svg'), sketch(provideInject(lang), 'p4c5-provide-inject'));
}
