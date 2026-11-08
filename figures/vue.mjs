/**
 * Figures of part 3, getting started with Vue. Writes one SVG per language into
 * site/src/assets/figures/<lang>/.
 *
 *   node figures/vue.mjs
 */
import {
  arrow,
  band,
  figure,
  fitted,
  heading,
  label,
  labelWidth,
  measure,
  meta,
  room,
  save,
  SIZE,
  strip,
  tile,
  WIDTH,
} from './diagram.mjs';

// Survey results in percent, the chapter on frameworks links both surveys
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
    // German sets a no-break space before the percent sign, as the course pages do
    percent: (value, digits = 0) => `${value.toFixed(digits).replace('.', ',')} %`,
    surveys: {
      title: 'Verbreitung und Zufriedenheit von React, Vue und Angular',
      desc:
        'Zwei Balkendiagramme mit einer Skala von 0 bis 100 %. ' +
        'Oben die Umfrage von Stack Overflow 2026 mit dem Anteil der Antworten zu Web-Frameworks, die das Framework verwenden, ' +
        'React 41,5, Vue.js 17,2 und Angular 16,0 %. ' +
        'Unten State of JS 2025 mit dem Anteil der Nutzenden, die das Framework wieder verwenden würden, ' +
        'React 72, Vue.js 84 und Angular 48 %.',
      panels: [
        ['Stack Overflow 2026', "Anteil der 10'281 Antworten zu Web-Frameworks, die das Framework verwenden"],
        ['State of JS 2025', 'Anteil der Nutzenden, die das Framework wieder verwenden würden'],
      ],
    },
    sfc: {
      title: 'Der Weg einer Single File Component bis auf die Seite',
      desc:
        'Oben die Datei App.vue mit drei Blöcken nebeneinander, template für den Aufbau, script setup für Zustand und Logik ' +
        'und style scoped für das Aussehen. ' +
        'Darunter übersetzt Vite die Datei mit dem Plugin für Vue in ein JavaScript-Modul mit einer Render-Funktion und in CSS. ' +
        'main.js importiert das Modul, erzeugt mit createApp die App ' +
        'und hängt sie mit mount in das Element mit der id app in index.html ein.',
      component: 'Single File Component',
      file: 'App.vue',
      blocks: [
        ['<template>', 'Aufbau mit HTML und Vue-Syntax'],
        ['<script setup>', 'Zustand und Logik in JavaScript'],
        ['<style scoped>', 'CSS nur für diese Komponente'],
      ],
      compiler: ['Vite', '@vitejs/plugin-vue'],
      module: ['JavaScript-Modul', 'mit Render-Funktion'],
      css: ['CSS', 'Regeln mit data-v-Attribut'],
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
        'prevent ein Modifikator und reserve der Wert, ein JavaScript-Ausdruck. ' +
        'Darunter die Kurzformen, @click.prevent="reserve" ist gleich v-on:click.prevent="reserve", ' +
        'und :href="link" ist gleich v-bind:href="link".',
      parts: ['Direktive', 'Argument', 'Modifikator', 'Wert, ein JavaScript-Ausdruck'],
      short: 'Kurzformen',
      same: 'ist gleich',
    },
    computed: {
      title: 'Abhängigkeiten der berechneten Werte im Katalog',
      desc:
        'Links stehen die Daten items und die Refs query und onlyAvailable. ' +
        'Der berechnete Wert visibleItems liest alle drei, availableCount liest nur items. ' +
        'Das Template zeigt die Liste aus visibleItems und die Zahl aus availableCount. ' +
        'Ändert sich query, rechnet Vue nur visibleItems neu und aktualisiert die Liste.',
      columns: ['Daten und Refs', 'Berechnete Werte', 'Template'],
      sources: [
        ['query', 'ref, Text im Suchfeld'],
        ['onlyAvailable', 'ref, nur verfügbare'],
        ['items', 'die Dinge des Katalogs'],
      ],
      list: ['Liste', 'v-for="item in visibleItems"'],
      count: ['Zahl', '{{ availableCount }} von …'],
      note: 'Ändert sich query, rechnet Vue nur visibleItems neu und zeichnet die Liste neu.',
    },
  },
  en: {
    percent: (value, digits = 0) => `${value.toFixed(digits)}%`,
    surveys: {
      title: 'Usage and satisfaction of React, Vue and Angular',
      desc:
        'Two bar charts on a scale from 0 to 100%. ' +
        'At the top the Stack Overflow survey of 2026 with the share of the answers on web frameworks that use the framework, ' +
        'React 41.5, Vue.js 17.2 and Angular 16.0%. ' +
        'At the bottom State of JS 2025 with the share of the users who would use the framework again, ' +
        'React 72, Vue.js 84 and Angular 48%.',
      panels: [
        ['Stack Overflow 2026', 'Share of the 10,281 answers on web frameworks that use the framework'],
        ['State of JS 2025', 'Share of the users who would use the framework again'],
      ],
    },
    sfc: {
      title: 'How a single file component gets onto the page',
      desc:
        'At the top the file App.vue with three blocks side by side, template for the structure, script setup for state and logic ' +
        'and style scoped for the looks. ' +
        'Below, Vite translates the file with the plugin for Vue into a JavaScript module with a render function and into CSS. ' +
        'main.js imports the module, creates the app with createApp ' +
        'and mounts it with mount into the element with the id app in index.html.',
      component: 'Single file component',
      file: 'App.vue',
      blocks: [
        ['<template>', 'structure in HTML and Vue syntax'],
        ['<script setup>', 'state and logic in JavaScript'],
        ['<style scoped>', 'CSS for this component only'],
      ],
      compiler: ['Vite', '@vitejs/plugin-vue'],
      module: ['JavaScript module', 'with a render function'],
      css: ['CSS', 'rules with a data-v attribute'],
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
        'prevent a modifier and reserve the value, a JavaScript expression. ' +
        'Below, the shorthands, @click.prevent="reserve" equals v-on:click.prevent="reserve", ' +
        'and :href="link" equals v-bind:href="link".',
      parts: ['directive', 'argument', 'modifier', 'value, a JavaScript expression'],
      short: 'Shorthands',
      same: 'equals',
    },
    computed: {
      title: 'Dependencies of the computed values in the catalog',
      desc:
        'On the left are the data items and the refs query and onlyAvailable. ' +
        'The computed value visibleItems reads all three, availableCount reads only items. ' +
        'The template shows the list from visibleItems and the number from availableCount. ' +
        'When query changes, Vue recalculates only visibleItems and updates the list.',
      columns: ['Data and refs', 'Computed values', 'Template'],
      sources: [
        ['query', 'ref, text in the search field'],
        ['onlyAvailable', 'ref, only available ones'],
        ['items', 'the things of the catalog'],
      ],
      list: ['List', 'v-for="item in visibleItems"'],
      count: ['Number', '{{ availableCount }} of …'],
      note: 'When query changes, Vue recalculates only visibleItems and renders the list again.',
    },
  },
};

/** The label of a band, stops the script when it is wider than the room inside the band */
function bandLabel(x, y, text, width, options = {}) {
  if (labelWidth(text) > width) {
    throw new Error(`The label "${text}" needs about ${Math.ceil(labelWidth(text))} px but has only ${Math.floor(width)} px.`);
  }
  return label(x, y, text, 'start', options);
}

/** A horizontal bar of a chart, square at its baseline and rounded at its end */
function bar(x, y, w, h) {
  const r = Math.min(4, w / 2);
  const end = x + w;
  const path = `M ${x} ${y} H ${end - r} Q ${end} ${y} ${end} ${y + r} V ${y + h - r} Q ${end} ${y + h} ${end - r} ${y + h} H ${x} Z`;
  return `<path class="d-fill-blue" d="${path}"/>`;
}

// The bars start after the names of the frameworks, 100 percent are 480 px
const BAR_X = 96;
const SCALE = 4.8;
const BAR_H = 18;
const BAR_STEP = 26;
const PANEL_H = 146;

function surveys(lang) {
  const t = TEXT[lang].surveys;
  const percent = TEXT[lang].percent;
  const id = `p3c1-surveys-${lang}`;
  const body = [];
  [SURVEYS.stackOverflow, SURVEYS.stateOfJs].forEach((rows, panel) => {
    const top = 16 + panel * (PANEL_H + 16);
    // Stack Overflow reports one decimal, State of JS whole percent
    const digits = panel === 0 ? 1 : 0;
    const [name, base] = t.panels[panel];
    const baseX = 32 + labelWidth(name) + 10;
    room(base, WIDTH - 32 - baseX);
    body.push(
      band(16, top, WIDTH - 32, PANEL_H, panel + 1),
      bandLabel(32, top + 24, name, WIDTH - 64, panel ? { tone: 'blue' } : {}),
      meta(baseX, top + 24, base),
    );
    // The scale runs from 0 to 100 percent below the bars, so every bar is read against the whole
    const axisY = top + 38 + rows.length * BAR_STEP;
    body.push(`<path class="d-axis" d="M ${BAR_X} ${top + 34} V ${axisY} H ${BAR_X + 100 * SCALE}"/>`);
    for (const tick of [0, 50, 100]) {
      const x = BAR_X + tick * SCALE;
      body.push(`<path class="d-axis" d="M ${x} ${axisY} V ${axisY + 4}"/>`, meta(x, axisY + 16, percent(tick), 'middle'));
    }
    rows.forEach(([framework, value], row) => {
      const y = top + 38 + row * BAR_STEP;
      const w = value * SCALE;
      const text = percent(value, digits);
      room(text, WIDTH - 32 - (BAR_X + w + 8), { size: SIZE.small, bold: true });
      body.push(
        fitted(BAR_X - 10, y + 13, framework, BAR_X - 10 - 32, 'end'),
        bar(BAR_X, y, w, BAR_H),
        heading(BAR_X + w + 8, y + 13, text),
      );
    });
  });
  return figure({ id, width: WIDTH, height: 16 + 2 * PANEL_H + 16 + 16, title: t.title, desc: t.desc, body });
}

const CARD_H = 48;

function sfc(lang) {
  const t = TEXT[lang].sfc;
  const id = `p3c2-sfc-${lang}`;
  // The three blocks of the file side by side, the steps after it in two columns below
  const blockW = 200;
  const fileBottom = 16 + 38 + CARD_H + 16;
  const vite = { x: WIDTH / 2 - 100, y: fileBottom + 32, w: 200 };
  const columnW = 260;
  const columns = [32, WIDTH - 32 - columnW];
  const centres = columns.map((x) => x + columnW / 2);
  const fork = vite.y + CARD_H + 24;
  const outY = vite.y + CARD_H + 52;
  const mainY = outY + CARD_H + 40;
  const fileX = 32 + labelWidth(t.component) + 10;
  const body = [
    band(16, 16, WIDTH - 32, fileBottom - 16, 1),
    bandLabel(32, 40, t.component, WIDTH - 64),
    fitted(fileX, 40, t.file, WIDTH - 32 - fileX, 'start', { code: true }),
    arrow(id, [[WIDTH / 2, fileBottom], [WIDTH / 2, vite.y - 4]], { accent: true }),
    fitted(WIDTH / 2 + 10, (fileBottom + vite.y) / 2 + 4, t.translates, 120),
    // Vite writes two results, the module with the render function and the CSS
    ...centres.map((x) => arrow(id, [[WIDTH / 2, vite.y + CARD_H + 1.5], [WIDTH / 2, fork], [x, fork], [x, outY - 4]])),
    arrow(id, [[centres[0], outY + CARD_H + 1.5], [centres[0], mainY - 4]]),
    fitted(centres[0] + 10, (outY + CARD_H + mainY) / 2 + 4, t.imports, 120),
    arrow(id, [[columns[0] + columnW, mainY + CARD_H / 2], [columns[1] - 4, mainY + CARD_H / 2]]),
    fitted(WIDTH / 2, mainY + CARD_H / 2 - 8, t.mounts, columns[1] - columns[0] - columnW - 16, 'middle'),
  ];
  t.blocks.forEach(([tag, sub], index) => body.push(tile(32 + index * (blockW + 8), 54, blockW, CARD_H, tag, sub)));
  body.push(
    tile(vite.x, vite.y, vite.w, CARD_H, ...t.compiler, { accent: true, code: true }),
    tile(columns[0], outY, columnW, CARD_H, ...t.module),
    tile(columns[1], outY, columnW, CARD_H, ...t.css),
    tile(columns[0], mainY, columnW, CARD_H, ...t.main, { code: true }),
    tile(columns[1], mainY, columnW, CARD_H, ...t.html, { code: true }),
  );
  return figure({ id, width: WIDTH, height: mainY + CARD_H + 16, title: t.title, desc: t.desc, body });
}

function directive(lang) {
  const t = TEXT[lang].directive;
  const id = `p3c3-directive-${lang}`;
  // The directive split at its separators, each part with its role below it
  const tokens = ['v-on', 'click', 'prevent', '"reserve"'];
  const widths = [112, 112, 120, 220];
  const separators = [':', '.', '='];
  const gap = (WIDTH - 32 - widths.reduce((sum, w) => sum + w, 0)) / separators.length;
  const body = [];
  let x = 16;
  tokens.forEach((token, index) => {
    // The value is a JavaScript expression, a second kind of thing next to the syntax of Vue
    body.push(tile(x, 16, widths[index], CARD_H, token, t.parts[index], index === 3 ? { tone: 'violet' } : {}));
    x += widths[index];
    if (index < separators.length) body.push(heading(x + gap / 2, 16 + CARD_H / 2 - 3, separators[index], 'middle'));
    x += gap;
  });
  const top = 16 + CARD_H + 24;
  const rows = [
    ['@click.prevent="reserve"', 'v-on:click.prevent="reserve"'],
    [':href="link"', 'v-bind:href="link"'],
  ];
  // Both forms stand on either side of the words in the middle, like the two sides of an equation
  const half = measure(t.same, SIZE.sub) / 2 + 20;
  const side = WIDTH / 2 - half - 32;
  body.push(band(16, top, WIDTH - 32, 88, 1), bandLabel(32, top + 24, t.short, WIDTH - 64));
  rows.forEach(([short, long], index) => {
    const y = top + 50 + index * 24;
    body.push(
      fitted(WIDTH / 2 - half, y, short, side, 'end', { code: true }),
      fitted(WIDTH / 2, y, t.same, 2 * half - 24, 'middle'),
      fitted(WIDTH / 2 + half, y, long, side, 'start', { code: true }),
    );
  });
  return figure({ id, width: WIDTH, height: top + 88 + 16, title: t.title, desc: t.desc, body });
}

function computedValues(lang) {
  const t = TEXT[lang].computed;
  const id = `p3c4-computed-${lang}`;
  // Three columns, what Vue reads, what it computes and what the template shows
  const bands = [
    { x: 16, w: 192, level: 1, tone: '' },
    { x: 224, w: 176, level: 2, tone: 'blue' },
    { x: 416, w: WIDTH - 16 - 416, level: 1, tone: '' },
  ];
  const [sources, values, view] = bands.map((b) => ({ x: b.x + 16, w: b.w - 32 }));
  const rows = [0, 1, 2].map((row) => 56 + row * (CARD_H + 12));
  // visibleItems reads all three sources, its tall card takes three straight arrows
  const tallH = rows[2] + CARD_H - rows[0];
  const tallCentre = rows[0] + tallH / 2;
  const countY = rows[2] + CARD_H + 24;
  const bottom = countY + CARD_H + 16;
  const centre = (y) => y + CARD_H / 2;
  const itemsX = sources.x + sources.w / 2;
  const body = [];
  bands.forEach((b, index) => {
    body.push(band(b.x, 16, b.w, bottom - 16, b.level), bandLabel(b.x + 16, 40, t.columns[index], b.w - 32, { tone: b.tone }));
  });
  // A new query starts the only recalculation the note talks about, so its path is drawn in blue
  rows.forEach((y, index) => {
    body.push(arrow(id, [[sources.x + sources.w, centre(y)], [values.x - 4, centre(y)]], { accent: index === 0 }));
  });
  body.push(
    // items also feeds availableCount, the line leaves the card below
    arrow(id, [[itemsX, rows[2] + CARD_H + 1.5], [itemsX, centre(countY)], [values.x - 4, centre(countY)]]),
    arrow(id, [[values.x + values.w, tallCentre], [view.x - 4, tallCentre]], { accent: true }),
    arrow(id, [[values.x + values.w, centre(countY)], [view.x - 4, centre(countY)]]),
  );
  t.sources.forEach(([name, sub], index) => body.push(tile(sources.x, rows[index], sources.w, CARD_H, name, sub)));
  body.push(
    tile(values.x, rows[0], values.w, tallH, 'visibleItems', 'computed', { accent: true, code: true }),
    tile(values.x, countY, values.w, CARD_H, 'availableCount', 'computed', { code: true }),
    tile(view.x, rows[0], view.w, tallH, ...t.list, { code: true }),
    tile(view.x, countY, view.w, CARD_H, ...t.count, { code: true }),
    strip(16, bottom + 24, WIDTH - 32, 30, t.note),
  );
  return figure({ id, width: WIDTH, height: bottom + 24 + 30 + 16, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) {
  save(lang, 'p3c1-surveys', surveys(lang));
  save(lang, 'p3c2-sfc', sfc(lang));
  save(lang, 'p3c3-directive', directive(lang));
  save(lang, 'p3c4-computed', computedValues(lang));
}
