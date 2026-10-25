/**
 * Figures of part 3, getting started with Vue. Writes one SVG per language into
 * site/src/assets/figures/<lang>/. Colours come from classes that site/src/styles/course.css maps
 * to the theme variables of the site, so the inlined figures follow light and dark mode.
 *
 *   node figures/vue.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Survey numbers of raw/notes/2026-10-24-research-vue-ecosystem.md, in percent
const SURVEYS = {
  stackOverflow: [
    ['React', 41.5],
    ['Vue.js', 17.2],
    ['Angular', 16.0],
  ],
  stateOfJs: [
    ['React', 72],
    ['Vue.js', 84],
    ['Angular', 48],
  ],
};

const TEXT = {
  de: {
    percent: (value, digits = 0) => `${value.toFixed(digits).replace('.', ',')} %`,
    surveys: {
      title: 'Verbreitung und Zufriedenheit von React, Vue und Angular',
      desc:
        'Zwei Balkendiagramme mit einer Skala von 0 bis 100 Prozent. ' +
        'Oben die Umfrage von Stack Overflow 2026, Anteil der Antworten zu Web-Frameworks, die das Framework verwenden: React 41,5, Vue.js 17,2, Angular 16,0 Prozent. ' +
        'Unten State of JS 2025, Anteil der Nutzenden, die das Framework wieder verwenden würden: React 72, Vue.js 84, Angular 48 Prozent.',
      panels: [
        ['Stack Overflow 2026, verwendet', "Anteil der 10'281 Antworten zu Web-Frameworks"],
        ['State of JS 2025, würden es wieder verwenden', 'Anteil der Nutzenden des jeweiligen Frameworks'],
      ],
    },
    sfc: {
      title: 'Der Weg einer Single File Component bis auf die Seite',
      desc:
        'Links die Datei App.vue mit drei Blöcken, template für den Aufbau, script setup für Zustand und Logik, style scoped für das Aussehen. ' +
        'Vite übersetzt die Datei mit dem Plugin für Vue in CSS und ein JavaScript-Modul mit einer Render-Funktion. ' +
        'main.js importiert das Modul, erzeugt mit createApp die App und hängt sie mit mount in das Element mit der id app in index.html ein.',
      file: 'App.vue',
      blocks: [
        ['<template>', 'Aufbau mit HTML und Vue-Syntax'],
        ['<script setup>', 'Zustand und Logik in JavaScript'],
        ['<style scoped>', 'CSS nur für diese Komponente'],
      ],
      compiler: ['Vite', 'mit @vitejs/plugin-vue'],
      css: ['CSS', 'Regeln mit data-v-Attribut'],
      module: ['JavaScript-Modul', 'mit Render-Funktion'],
      main: ['main.js', "createApp(App).mount('#app')"],
      html: ['index.html', '<div id="app"></div>'],
      translates: 'übersetzt',
      imports: 'importiert',
      mounts: 'hängt ein',
    },
    directive: {
      title: 'Die Teile einer Direktive',
      desc:
        'Die Direktive v-on:click.prevent="reserve" in Teile zerlegt. v-on ist der Name der Direktive, click das Argument, ' +
        'prevent ein Modifikator und reserve der Wert, ein JavaScript-Ausdruck. Darunter die Kurzformen, @ steht für v-on: und der Doppelpunkt für v-bind:.',
      labels: ['Direktive', 'Argument', 'Modifikator', 'Wert, ein JavaScript-Ausdruck'],
      short: 'Kurzformen',
      same: 'ist gleich',
    },
    computed: {
      title: 'Abhängigkeiten der berechneten Werte im Katalog',
      desc:
        'Links stehen die Daten items und die Refs query und onlyAvailable. Der berechnete Wert visibleItems liest alle drei, availableCount liest nur items. ' +
        'Das Template zeigt die Liste aus visibleItems und die Zahl aus availableCount. ' +
        'Ändert sich query, rechnet Vue nur visibleItems neu und aktualisiert die Liste.',
      sources: [
        ['items', 'die Dinge des Katalogs'],
        ['query', 'ref, Text im Suchfeld'],
        ['onlyAvailable', 'ref, nur verfügbare'],
      ],
      values: [
        ['visibleItems', 'computed'],
        ['availableCount', 'computed'],
      ],
      template: ['Template', ['<li v-for="item in', '  visibleItems">', '{{ availableCount }} von …']],
      reads: 'liest',
      note: 'Ändert sich query, rechnet Vue nur visibleItems neu und zeichnet die Liste neu.',
    },
  },
  en: {
    percent: (value, digits = 0) => `${value.toFixed(digits)}%`,
    surveys: {
      title: 'Usage and satisfaction of React, Vue and Angular',
      desc:
        'Two bar charts on a scale from 0 to 100 percent. ' +
        'At the top the Stack Overflow survey of 2026, share of the answers on web frameworks that use the framework: React 41.5, Vue.js 17.2, Angular 16.0 percent. ' +
        'At the bottom State of JS 2025, share of the users who would use the framework again: React 72, Vue.js 84, Angular 48 percent.',
      panels: [
        ['Stack Overflow 2026, used', 'share of the 10,281 answers on web frameworks'],
        ['State of JS 2025, would use again', 'share of the users of each framework'],
      ],
    },
    sfc: {
      title: 'How a single file component gets onto the page',
      desc:
        'On the left the file App.vue with three blocks, template for the structure, script setup for state and logic, style scoped for the looks. ' +
        'Vite translates the file with the plugin for Vue into CSS and a JavaScript module with a render function. ' +
        'main.js imports the module, creates the app with createApp and mounts it with mount into the element with the id app in index.html.',
      file: 'App.vue',
      blocks: [
        ['<template>', 'structure with HTML and Vue syntax'],
        ['<script setup>', 'state and logic in JavaScript'],
        ['<style scoped>', 'CSS for this component only'],
      ],
      compiler: ['Vite', 'with @vitejs/plugin-vue'],
      css: ['CSS', 'rules with a data-v attribute'],
      module: ['JavaScript module', 'with a render function'],
      main: ['main.js', "createApp(App).mount('#app')"],
      html: ['index.html', '<div id="app"></div>'],
      translates: 'translates',
      imports: 'imports',
      mounts: 'mounts',
    },
    directive: {
      title: 'The parts of a directive',
      desc:
        'The directive v-on:click.prevent="reserve" split into its parts. v-on is the name of the directive, click the argument, ' +
        'prevent a modifier and reserve the value, a JavaScript expression. Below, the shorthands, @ stands for v-on: and the colon for v-bind:.',
      labels: ['directive', 'argument', 'modifier', 'value, a JavaScript expression'],
      short: 'Shorthands',
      same: 'equals',
    },
    computed: {
      title: 'Dependencies of the computed values in the catalog',
      desc:
        'On the left are the data items and the refs query and onlyAvailable. The computed value visibleItems reads all three, availableCount reads only items. ' +
        'The template shows the list from visibleItems and the number from availableCount. ' +
        'When query changes, Vue recalculates only visibleItems and updates the list.',
      sources: [
        ['items', 'the things of the catalog'],
        ['query', 'ref, text in the search field'],
        ['onlyAvailable', 'ref, only available ones'],
      ],
      values: [
        ['visibleItems', 'computed'],
        ['availableCount', 'computed'],
      ],
      template: ['Template', ['<li v-for="item in', '  visibleItems">', '{{ availableCount }} of …']],
      reads: 'reads',
      note: 'When query changes, Vue recalculates only visibleItems and renders the list again.',
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

// A box with a name and a second line, the second line in code font when code is true
function box(x, y, width, height, [name, sub], { strong = false, code = false } = {}) {
  return [
    `<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${x}" y="${y}" width="${width}" height="${height}" rx="8"/>`,
    `<text class="fig-text" x="${x + width / 2}" y="${y + height / 2 - 4}" text-anchor="middle">${escape(name)}</text>`,
    `<text class="${code ? 'fig-code' : 'fig-sub'}" x="${x + width / 2}" y="${y + height / 2 + 15}" text-anchor="middle">${escape(sub)}</text>`,
  ];
}

const arrow = (id, from, to) => `<path class="fig-arrow" d="M ${from[0]} ${from[1]} L ${to[0]} ${to[1]}" marker-end="url(#${id}-head)"/>`;

function surveys(lang) {
  const t = TEXT[lang].surveys;
  const id = `p3c1-surveys-${lang}`;
  const left = 120;
  const scale = 4.6; // pixels per percent, 100 percent are 460 pixels
  const parts = [];
  let y = 26;
  [SURVEYS.stackOverflow, SURVEYS.stateOfJs].forEach((rows, panel) => {
    // Stack Overflow reports one decimal, State of JS whole percent
    const digits = panel === 0 ? 1 : 0;
    const [heading, sub] = t.panels[panel];
    parts.push(
      `<text class="fig-text" x="20" y="${y}">${escape(heading)}</text>`,
      `<text class="fig-sub" x="20" y="${y + 20}">${escape(sub)}</text>`,
    );
    y += 34;
    rows.forEach(([name, value]) => {
      parts.push(
        `<text class="fig-sub" x="${left - 10}" y="${y + 16}" text-anchor="end">${escape(name)}</text>`,
        `<rect class="fig-box fig-box-strong" x="${left}" y="${y}" width="${value * scale}" height="22" rx="3"/>`,
        `<text class="fig-sub fig-strong" x="${left + value * scale + 8}" y="${y + 16}">${escape(TEXT[lang].percent(value, digits))}</text>`,
      );
      y += 30;
    });
    // The axis from 0 to 100 percent below each panel
    parts.push(`<path class="fig-arrow" d="M ${left} ${y - 4} L ${left + 100 * scale} ${y - 4}" stroke-width="1"/>`);
    for (const tick of [0, 50, 100]) {
      parts.push(
        `<path class="fig-arrow" d="M ${left + tick * scale} ${y - 8} L ${left + tick * scale} ${y}" stroke-width="1"/>`,
        `<text class="fig-sub" x="${left + tick * scale}" y="${y + 14}" text-anchor="middle">${escape(TEXT[lang].percent(tick))}</text>`,
      );
    }
    y += 44;
  });
  return svg(id, 680, y - 20, t, parts);
}

function sfc(lang) {
  const t = TEXT[lang].sfc;
  const id = `p3c2-sfc-${lang}`;
  const parts = [
    `<rect class="fig-box" x="20" y="20" width="250" height="250" rx="10"/>`,
    `<text class="fig-text" x="40" y="48">${escape(t.file)}</text>`,
  ];
  t.blocks.forEach(([tag, sub], index) => {
    const top = 64 + index * 66;
    parts.push(
      `<rect class="fig-box fig-box-strong" x="36" y="${top}" width="218" height="54" rx="6"/>`,
      `<text class="fig-code" x="48" y="${top + 22}">${escape(tag)}</text>`,
      `<text class="fig-sub" x="48" y="${top + 42}">${escape(sub)}</text>`,
    );
  });
  parts.push(
    ...box(310, 114, 150, 60, t.compiler),
    arrow(id, [272, 144], [306, 144]),
    ...box(500, 20, 160, 60, t.css),
    ...box(500, 120, 160, 60, t.module),
    `<path class="fig-arrow" d="M 462 132 L 496 62" marker-end="url(#${id}-head)"/>`,
    arrow(id, [462, 150], [496, 150]),
    ...box(410, 240, 250, 60, t.main, { code: true }),
    arrow(id, [580, 182], [580, 236]),
    ...label(580, 214, t.imports),
    ...box(410, 350, 250, 60, t.html, { code: true }),
    arrow(id, [535, 302], [535, 346]),
    ...label(535, 330, t.mounts),
  );
  return svg(id, 680, 424, t, parts);
}

function directive(lang) {
  const t = TEXT[lang].directive;
  const id = `p3c3-directive-${lang}`;
  // Each token of v-on:click.prevent="reserve" gets a box, labelled tokens get a label below
  const tokens = [
    { text: 'v-on', label: 0 },
    { text: ':' },
    { text: 'click', label: 1 },
    { text: '.' },
    { text: 'prevent', label: 2 },
    { text: '=' },
    { text: '"reserve"', label: 3 },
  ];
  const charWidth = 12.5;
  const parts = [];
  let x = 40;
  for (const token of tokens) {
    const width = token.text.length * charWidth + (token.label === undefined ? 10 : 24);
    const strong = token.label !== undefined;
    parts.push(
      `<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${x}" y="24" width="${width}" height="44" rx="6"/>`,
      `<text class="fig-code" x="${x + width / 2}" y="53" text-anchor="middle" style="font-size: 20px">${escape(token.text)}</text>`,
    );
    if (strong) {
      const center = x + width / 2;
      parts.push(`<path class="fig-arrow" d="M ${center} 70 L ${center} 92" stroke-width="1.5"/>`);
      parts.push(`<text class="fig-sub" x="${center}" y="108" text-anchor="middle">${escape(t.labels[token.label])}</text>`);
    }
    x += width + 6;
  }
  parts.push(
    `<text class="fig-text" x="40" y="156">${escape(t.short)}</text>`,
    `<text class="fig-code" x="40" y="182" style="font-size: 15px">@click.prevent="reserve"</text>`,
    `<text class="fig-sub" x="270" y="182">${escape(t.same)}</text>`,
    `<text class="fig-code" x="350" y="182" style="font-size: 15px">v-on:click.prevent="reserve"</text>`,
    `<text class="fig-code" x="40" y="210" style="font-size: 15px">:href="link"</text>`,
    `<text class="fig-sub" x="270" y="210">${escape(t.same)}</text>`,
    `<text class="fig-code" x="350" y="210" style="font-size: 15px">v-bind:href="link"</text>`,
  );
  return svg(id, 680, 226, t, parts);
}

function computedValues(lang) {
  const t = TEXT[lang].computed;
  const id = `p3c4-computed-${lang}`;
  const parts = [];
  t.sources.forEach((source, index) => parts.push(...box(20, 20 + index * 80, 190, 60, source, { strong: index > 0 })));
  t.values.forEach((value, index) => parts.push(...box(250, 50 + index * 110, 170, 60, value, { strong: true })));
  const [name, lines] = t.template;
  parts.push(
    `<rect class="fig-box" x="456" y="50" width="210" height="170" rx="8"/>`,
    `<text class="fig-text" x="561" y="80" text-anchor="middle">${escape(name)}</text>`,
    `<text class="fig-code" x="468" y="112" xml:space="preserve">${escape(lines[0])}</text>`,
    `<text class="fig-code" x="468" y="130" xml:space="preserve">${escape(lines[1])}</text>`,
    `<text class="fig-code" x="468" y="190">${escape(lines[2])}</text>`,
    // items, query and onlyAvailable to visibleItems, items to availableCount
    arrow(id, [212, 50], [246, 72]),
    arrow(id, [212, 130], [246, 84]),
    arrow(id, [212, 210], [246, 96]),
    arrow(id, [212, 56], [246, 182]),
    arrow(id, [422, 80], [452, 112]),
    arrow(id, [422, 190], [452, 186]),
    `<text class="fig-sub fig-note" x="340" y="276" text-anchor="middle">${escape(t.note)}</text>`,
  );
  return svg(id, 680, 290, t, parts);
}

for (const lang of Object.keys(TEXT)) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'p3c1-surveys.svg'), surveys(lang));
  writeFileSync(join(folder, 'p3c2-sfc.svg'), sfc(lang));
  writeFileSync(join(folder, 'p3c3-directive.svg'), directive(lang));
  writeFileSync(join(folder, 'p3c4-computed.svg'), computedValues(lang));
}
