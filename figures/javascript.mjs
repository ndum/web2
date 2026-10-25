/**
 * Figures of part 1, JavaScript for SPAs. Writes one SVG per language into site/src/assets/figures/<lang>/.
 * Colours come from classes that site/src/styles/course.css maps to the theme variables of the
 * site, so the inlined figures follow light and dark mode.
 *
 *   node figures/javascript.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT = {
  de: {
    references: {
      title: 'Zwei Variablen, ein Objekt',
      desc:
        'Links stehen die Variablen tent, sameTent und copy, rechts zwei Objekte im Speicher. ' +
        'Von tent und von sameTent führt je ein Pfeil zum selben Objekt, in dem availableFrom gleich 2026-11-14 steht. ' +
        'Von copy führt ein Pfeil zu einem zweiten Objekt, das mit dem Spread-Operator entstanden ist und in dem availableFrom noch null ist.',
      variables: 'Variablen',
      objects: 'Objekte im Speicher',
      name: 'Zelt für vier Personen',
      same: 'tent und sameTent zeigen auf dasselbe Objekt',
      copy: 'copy zeigt auf eine Kopie, entstanden mit { ...tent }',
    },
    loop: {
      title: 'Die Ereignisschleife mit Task-Queue und Microtask-Queue',
      desc:
        'Links steht der Aufrufstapel mit den Funktionen, die gerade laufen. Ein Pfeil führt nach rechts zu Timern und Anfragen, ' +
        'die der Browser oder Node übernimmt, etwa setTimeout und fetch. Ist ein Timer abgelaufen, kommt sein Callback in die Task-Queue, ' +
        'ebenso Klicks. Promises legen ihre Fortsetzungen mit then und await in die Microtask-Queue. ' +
        'Zwei Pfeile führen zurück zum Aufrufstapel. Ist der Stapel leer, holt die Ereignisschleife zuerst alle Microtasks und danach einen Task.',
      stack: 'Aufrufstapel',
      apis: 'Timer und Anfragen',
      starts: 'startet',
      done: 'fertig',
      tasks: 'Task-Queue',
      microtasks: 'Microtask-Queue',
      taskEntries: ['Timer', 'Klick'],
      first: '1. zuerst alle',
      then: '2. dann einer',
      note: 'Ist der Stapel leer, holt die Ereignisschleife zuerst alle Microtasks, dann einen Task.',
    },
  },
  en: {
    references: {
      title: 'Two variables, one object',
      desc:
        'On the left are the variables tent, sameTent and copy, on the right two objects in memory. ' +
        'An arrow leads from tent and one from sameTent to the same object, in which availableFrom equals 2026-11-14. ' +
        'An arrow leads from copy to a second object, which was made with the spread operator and in which availableFrom is still null.',
      variables: 'Variables',
      objects: 'Objects in memory',
      name: 'Tent for four',
      same: 'tent and sameTent point to the same object',
      copy: 'copy points to a copy made with { ...tent }',
    },
    loop: {
      title: 'The event loop with task queue and microtask queue',
      desc:
        'On the left is the call stack with the functions that are running. An arrow leads right to timers and requests, ' +
        'which the browser or Node take over, such as setTimeout and fetch. When a timer has run out, its callback goes into the task queue, ' +
        'and so do clicks. Promises put their continuations from then and await into the microtask queue. ' +
        'Two arrows lead back to the call stack. When the stack is empty, the event loop takes all microtasks first and then one task.',
      stack: 'Call stack',
      apis: 'Timers and requests',
      starts: 'starts',
      done: 'done',
      tasks: 'Task queue',
      microtasks: 'Microtask queue',
      taskEntries: ['Timer', 'click'],
      first: '1. all first',
      then: '2. then one',
      note: 'When the stack is empty, the event loop takes all microtasks first, then one task.',
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
function label(x, y, text, anchor = 'middle') {
  const width = text.length * 6.6 + 10;
  const left = anchor === 'middle' ? x - width / 2 : x - 5;
  return [
    `<rect class="fig-label-bg" x="${left}" y="${y - 13}" width="${width}" height="18" rx="3"/>`,
    `<text class="fig-sub" x="${x}" y="${y}" text-anchor="${anchor}">${escape(text)}</text>`,
  ];
}

function references(lang) {
  const t = TEXT[lang].references;
  const id = `p1c2-references-${lang}`;
  const parts = [
    `<text class="fig-sub" x="20" y="26">${escape(t.variables)}</text>`,
    `<text class="fig-sub" x="330" y="26">${escape(t.objects)}</text>`,
  ];
  const variables = [
    { name: 'const tent', y: 44, to: 84 },
    { name: 'const sameTent', y: 104, to: 108 },
    { name: 'const copy', y: 200, to: 228 },
  ];
  for (const variable of variables) {
    parts.push(
      `<rect class="fig-box" x="20" y="${variable.y}" width="150" height="40" rx="8"/>`,
      `<text class="fig-code" x="34" y="${variable.y + 25}">${escape(variable.name)}</text>`,
      `<path class="fig-arrow" d="M 170 ${variable.y + 20} C 250 ${variable.y + 20}, 250 ${variable.to}, 326 ${variable.to}" marker-end="url(#${id}-head)"/>`,
    );
  }
  const objects = [
    { y: 58, from: "'2026-11-14'", strong: true, note: t.same, noteY: 154 },
    { y: 190, from: 'null', strong: false, note: t.copy, noteY: 286 },
  ];
  for (const object of objects) {
    parts.push(
      `<rect class="fig-box${object.strong ? ' fig-box-strong' : ''}" x="330" y="${object.y}" width="330" height="76" rx="10"/>`,
      `<text class="fig-code" x="346" y="${object.y + 30}">${escape(`name: '${t.name}'`)}</text>`,
      `<text class="fig-code" x="346" y="${object.y + 54}">${escape(`availableFrom: ${object.from}`)}</text>`,
      `<text class="fig-sub fig-note" x="330" y="${object.noteY}">${escape(object.note)}</text>`,
    );
  }
  return svg(id, 680, 300, t, parts);
}

function eventLoop(lang) {
  const t = TEXT[lang].loop;
  const id = `p1c4-loop-${lang}`;
  const parts = [
    // Call stack with two frames at its bottom
    `<rect class="fig-box" x="20" y="40" width="200" height="250" rx="10"/>`,
    `<text class="fig-text" x="120" y="68" text-anchor="middle">${escape(t.stack)}</text>`,
    `<rect class="fig-box fig-box-strong" x="40" y="214" width="160" height="28" rx="6"/>`,
    `<text class="fig-code" x="120" y="233" text-anchor="middle">showCatalog()</text>`,
    `<rect class="fig-box fig-box-strong" x="40" y="248" width="160" height="28" rx="6"/>`,
    `<text class="fig-code" x="120" y="267" text-anchor="middle">main.mjs</text>`,
    // Timers and requests that run outside the program
    `<rect class="fig-box" x="450" y="40" width="210" height="72" rx="10"/>`,
    `<text class="fig-text" x="555" y="68" text-anchor="middle">${escape(t.apis)}</text>`,
    `<text class="fig-code" x="555" y="94" text-anchor="middle">setTimeout, fetch</text>`,
    `<path class="fig-arrow" d="M 222 76 L 446 76" marker-end="url(#${id}-head)"/>`,
    ...label(334, 72, t.starts),
    `<path class="fig-arrow" d="M 555 112 L 555 146" marker-end="url(#${id}-head)"/>`,
    `<text class="fig-sub" x="566" y="134">${escape(t.done)}</text>`,
  ];
  const queues = [
    { name: t.tasks, y: 150, entries: t.taskEntries, back: t.then },
    { name: t.microtasks, y: 232, entries: ['then', 'await'], back: t.first },
  ];
  for (const queue of queues) {
    parts.push(
      `<rect class="fig-box" x="330" y="${queue.y}" width="330" height="52" rx="10"/>`,
      `<text class="fig-text" x="346" y="${queue.y + 32}">${escape(queue.name)}</text>`,
    );
    queue.entries.forEach((entry, index) => {
      const x = 522 + index * 68;
      parts.push(
        `<rect class="fig-box fig-box-strong" x="${x}" y="${queue.y + 10}" width="60" height="32" rx="6"/>`,
        `<text class="fig-code" x="${x + 30}" y="${queue.y + 31}" text-anchor="middle">${escape(entry)}</text>`,
      );
    });
    parts.push(`<path class="fig-arrow" d="M 328 ${queue.y + 26} L 224 ${queue.y + 26}" marker-end="url(#${id}-head)"/>`, ...label(276, queue.y + 18, queue.back));
  }
  parts.push(`<text class="fig-sub fig-note" x="20" y="316">${escape(t.note)}</text>`);
  return svg(id, 680, 326, t, parts);
}

for (const lang of Object.keys(TEXT)) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'p1c2-references.svg'), references(lang));
  writeFileSync(join(folder, 'p1c4-event-loop.svg'), eventLoop(lang));
}
