/**
 * Figures of part 5, reactivity and composables. Writes one SVG per language into
 * site/src/assets/figures/<lang>/. Colours come from classes that site/src/styles/course.css maps
 * to the theme variables of the site, so the inlined figures follow light and dark mode.
 *
 *   node figures/reactivity.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { sketch } from './sketch.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT = {
  de: {
    dependencies: {
      title: 'Abhängigkeiten verfolgen und auslösen',
      desc:
        'Drei Kästchen in einer Reihe, das Ref favorites, der berechnete Wert favoriteCount und die Render-Funktion von AppHeader, dazu rechts die Seite mit dem Text 3 Favoriten. ' +
        'Oben zeigen Pfeile, wer wen liest, die Render-Funktion liest favoriteCount, favoriteCount liest favorites. Vue merkt sich dabei jede Abhängigkeit. ' +
        'Unten zeigen Pfeile, was eine Änderung auslöst. push ändert favorites, Vue markiert favoriteCount als veraltet und lässt die Render-Funktion neu laufen, die Seite zeigt den neuen Wert.',
      boxes: [
        ['favorites', 'ref'],
        ['favoriteCount', 'computed'],
        ['render()', 'AppHeader'],
        ['Seite', '3 Favoriten'],
      ],
      reads: 'liest, Vue merkt es sich',
      triggers: 'Änderung, Vue löst neu aus',
      change: 'favorites.value.push(3)',
    },
    choice: {
      title: 'computed oder watch',
      desc:
        'Ein Entscheidungsbaum mit zwei Fragen. Entsteht ein Wert aus anderen Werten, wie die Zahl der Treffer, dann computed. ' +
        'Soll sonst etwas ausserhalb der Komponente passieren, wie Speichern, der Titel des Tabs oder eine Anfrage an den Server, dann watch oder watchEffect. ' +
        'Reagiert der Code nur auf eine Handlung, wie einen Klick, dann eine Funktion für das Event.',
      first: ['Entsteht ein Wert', 'aus anderen Werten?'],
      second: ['Soll ausserhalb etwas', 'passieren?'],
      yes: 'ja',
      no: 'nein',
      computed: ['computed', 'Zahl der Treffer'],
      watch: ['watch, watchEffect', 'Speichern, Titel, Server'],
      handler: ['Funktion für ein Event', 'Klick auf Reservieren'],
    },
    lifecycle: {
      title: 'Der Lebenszyklus einer Komponente',
      desc:
        'Eine Zeitachse von oben nach unten. Zuerst läuft setup, dann onBeforeMount, dann onMounted, ab hier steht die Komponente im DOM. ' +
        'Bei jeder Änderung des Zustands folgen onBeforeUpdate und onUpdated, ein Pfeil führt von onUpdated zurück zu onBeforeUpdate. Wenn die Komponente verschwindet, folgen onBeforeUnmount und onUnmounted. ' +
        'Rechts steht neben setup, dass dort der Zustand entsteht und es noch kein DOM gibt, neben onMounted, dass dort Fokus, Messen und Listener hingehören, ' +
        'neben den beiden Hooks für Updates, dass sie bei jeder Änderung laufen, und neben onUnmounted, dass dort Listener und Timer aufgeräumt werden.',
      phases: ['setup', 'onBeforeMount', 'onMounted', 'onBeforeUpdate', 'onUpdated', 'onBeforeUnmount', 'onUnmounted'],
      notes: [
        ['Zustand anlegen,', 'noch kein DOM'],
        ['DOM ist da, Fokus,', 'Messen, Listener'],
        ['bei jeder Änderung', 'des Zustands'],
        ['aufräumen, Listener', 'und Timer entfernen'],
      ],
    },
  },
  en: {
    dependencies: {
      title: 'Tracking and triggering dependencies',
      desc:
        'Three boxes in a row, the ref favorites, the computed value favoriteCount and the render function of AppHeader, plus the page on the right with the text 3 favorites. ' +
        'At the top, arrows show who reads whom, the render function reads favoriteCount, favoriteCount reads favorites. Vue remembers every dependency on the way. ' +
        'At the bottom, arrows show what a change triggers. push changes favorites, Vue marks favoriteCount as stale and runs the render function again, and the page shows the new value.',
      boxes: [
        ['favorites', 'ref'],
        ['favoriteCount', 'computed'],
        ['render()', 'AppHeader'],
        ['Page', '3 favorites'],
      ],
      reads: 'reads, Vue remembers it',
      triggers: 'change, Vue triggers again',
      change: 'favorites.value.push(3)',
    },
    choice: {
      title: 'computed or watch',
      desc:
        'A decision tree with two questions. If a value is derived from other values, such as the number of hits, then computed. ' +
        'Otherwise, if something should happen outside the component, such as storing, the title of the tab or a request to the server, then watch or watchEffect. ' +
        'If the code only reacts to an action, such as a click, then a function for the event.',
      first: ['Is a value derived', 'from other values?'],
      second: ['Should something happen', 'outside?'],
      yes: 'yes',
      no: 'no',
      computed: ['computed', 'number of hits'],
      watch: ['watch, watchEffect', 'storing, title, server'],
      handler: ['function for an event', 'click on Reserve'],
    },
    lifecycle: {
      title: 'The lifecycle of a component',
      desc:
        'A timeline from top to bottom. First setup runs, then onBeforeMount, then onMounted, from here on the component is in the DOM. ' +
        'Every change of the state is followed by onBeforeUpdate and onUpdated, an arrow leads from onUpdated back to onBeforeUpdate. When the component disappears, onBeforeUnmount and onUnmounted follow. ' +
        'On the right, next to setup it says that the state is created there and there is no DOM yet, next to onMounted that focus, measuring and listeners belong there, ' +
        'next to the two update hooks that they run on every change, and next to onUnmounted that listeners and timers are cleaned up there.',
      phases: ['setup', 'onBeforeMount', 'onMounted', 'onBeforeUpdate', 'onUpdated', 'onBeforeUnmount', 'onUnmounted'],
      notes: [
        ['create state,', 'no DOM yet'],
        ['DOM is there, focus,', 'measuring, listeners'],
        ['on every change', 'of the state'],
        ['clean up, remove', 'listeners and timers'],
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

const arrow = (id, path) => `<path class="fig-arrow" d="${path}" marker-end="url(#${id}-head)"/>`;

// A box with a name and a second line, the name in code font when code is true
function box(x, y, width, height, [name, sub], { strong = false, code = false } = {}) {
  return [
    `<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${x}" y="${y}" width="${width}" height="${height}" rx="8"/>`,
    `<text class="${code ? 'fig-code fig-strong' : 'fig-text'}" x="${x + width / 2}" y="${y + height / 2 - 4}" text-anchor="middle"${code ? ' style="font-size: 14px"' : ''}>${escape(name)}</text>`,
    `<text class="fig-sub" x="${x + width / 2}" y="${y + height / 2 + 15}" text-anchor="middle">${escape(sub)}</text>`,
  ];
}

function dependencies(lang) {
  const t = TEXT[lang].dependencies;
  const id = `p5c1-deps-${lang}`;
  const xs = [20, 190, 360, 530];
  const parts = [];
  t.boxes.forEach((content, index) => {
    parts.push(...box(xs[index], 90, 140, 58, content, { strong: index < 3, code: index < 3 }));
  });
  // Reading goes from right to left at the top, the change runs from left to right at the bottom
  for (const index of [1, 2]) {
    parts.push(arrow(id, `M ${xs[index] + 20} 86 C ${xs[index] + 10} 50, ${xs[index] - 20} 50, ${xs[index] - 40} 86`));
  }
  parts.push(`<text class="fig-sub" x="275" y="40" text-anchor="middle">${escape(t.reads)}</text>`);
  for (const index of [0, 1, 2]) {
    parts.push(arrow(id, `M ${xs[index] + 120} 152 C ${xs[index] + 135} 190, ${xs[index + 1] - 5} 190, ${xs[index + 1] + 20} 152`));
  }
  parts.push(
    `<text class="fig-sub" x="345" y="214" text-anchor="middle">${escape(t.triggers)}</text>`,
    `<text class="fig-code" x="90" y="186" text-anchor="middle">${escape(t.change)}</text>`,
  );
  return svg(id, 690, 228, t, parts);
}

function choice(lang) {
  const t = TEXT[lang].choice;
  const id = `p5c2-choice-${lang}`;
  const question = (x, y, lines) => [
    `<rect class="fig-box" x="${x}" y="${y}" width="200" height="56" rx="28"/>`,
    `<text class="fig-sub fig-strong" x="${x + 100}" y="${y + 24}" text-anchor="middle">${escape(lines[0])}</text>`,
    `<text class="fig-sub fig-strong" x="${x + 100}" y="${y + 42}" text-anchor="middle">${escape(lines[1])}</text>`,
  ];
  const parts = [
    ...question(20, 20, t.first),
    ...box(330, 20, 200, 56, t.computed, { strong: true, code: true }),
    arrow(id, 'M 222 48 L 326 48'),
    `<text class="fig-sub" x="274" y="40" text-anchor="middle">${escape(t.yes)}</text>`,
    arrow(id, 'M 120 78 L 120 122'),
    `<text class="fig-sub" x="132" y="104">${escape(t.no)}</text>`,
    ...question(20, 126, t.second),
    ...box(330, 126, 200, 56, t.watch, { strong: true, code: true }),
    arrow(id, 'M 222 154 L 326 154'),
    `<text class="fig-sub" x="274" y="146" text-anchor="middle">${escape(t.yes)}</text>`,
    arrow(id, 'M 120 184 L 120 228'),
    `<text class="fig-sub" x="132" y="210">${escape(t.no)}</text>`,
    ...box(20, 232, 200, 56, t.handler),
  ];
  return svg(id, 560, 300, t, parts);
}

function lifecycle(lang) {
  const t = TEXT[lang].lifecycle;
  const id = `p5c3-lifecycle-${lang}`;
  const parts = [];
  const left = 70;
  const width = 170;
  const step = 50;
  const top = 20;
  t.phases.forEach((phase, index) => {
    const y = top + index * step;
    const update = index === 3 || index === 4;
    parts.push(
      `<rect class="fig-box${index === 2 || index === 6 ? ' fig-box-strong' : ''}" x="${left}" y="${y}" width="${width}" height="34" rx="6"${update ? ' stroke-dasharray="5 4"' : ''}/>`,
      `<text class="fig-code" x="${left + width / 2}" y="${y + 22}" text-anchor="middle" style="font-size: 13px">${escape(phase)}</text>`,
    );
    if (index < t.phases.length - 1) parts.push(arrow(id, `M ${left + width / 2} ${y + 36} L ${left + width / 2} ${y + step - 2}`));
  });
  // The two update hooks repeat on every change, an arrow loops back on the left
  const updateTop = top + 3 * step + 17;
  const updateBottom = top + 4 * step + 17;
  parts.push(arrow(id, `M ${left - 2} ${updateBottom} C ${left - 50} ${updateBottom}, ${left - 50} ${updateTop}, ${left - 6} ${updateTop}`));
  // Notes on the right, next to the hooks they explain
  const notes = [
    [0, t.notes[0]],
    [2, t.notes[1]],
    [3.5, t.notes[2]],
    [6, t.notes[3]],
  ];
  for (const [index, lines] of notes) {
    const y = top + index * step + 14;
    parts.push(
      `<text class="fig-sub" x="${left + width + 24}" y="${y}">${escape(lines[0])}</text>`,
      `<text class="fig-sub" x="${left + width + 24}" y="${y + 17}">${escape(lines[1])}</text>`,
    );
  }
  return svg(id, 520, top + 7 * step - 6, t, parts);
}

for (const lang of Object.keys(TEXT)) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'p5c1-dependencies.svg'), sketch(dependencies(lang), 'p5c1-dependencies'));
  writeFileSync(join(folder, 'p5c2-computed-or-watch.svg'), sketch(choice(lang), 'p5c2-computed-or-watch'));
  writeFileSync(join(folder, 'p5c3-lifecycle.svg'), sketch(lifecycle(lang), 'p5c3-lifecycle'));
}
