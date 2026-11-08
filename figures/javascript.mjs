/**
 * Figures of part 1, JavaScript for SPAs. Writes one SVG per language into site/src/assets/figures/<lang>/.
 *
 *   node figures/javascript.mjs
 */
import { arrow, badge, band, figure, fitted, label, labelWidth, mixed, mixedWidth, save, strip, tile, WIDTH } from './diagram.mjs';

const TEXT = {
  de: {
    references: {
      title: 'Zwei Variablen, ein Objekt',
      desc:
        'Links stehen die Variablen tent, sameTent und copy, rechts zwei Objekte im Speicher. ' +
        'Von tent und von sameTent führt je ein Pfeil zum selben Objekt, in dem availableFrom gleich 2026-11-14 steht. ' +
        'Von copy führt ein Pfeil zu einem zweiten Objekt, das mit dem Spread-Operator entstanden ist ' +
        'und in dem availableFrom noch null ist.',
      variables: 'Variablen',
      objects: 'Objekte im Speicher',
      name: 'Zelt für vier Personen',
      same: [['tent', true], [' und ', false], ['sameTent', true], [' zeigen auf dasselbe Objekt', false]],
      copy: [['copy', true], [' zeigt auf eine Kopie, entstanden mit ', false], ['{ ...tent }', true]],
    },
    loop: {
      title: 'Die Ereignisschleife mit Task-Queue und Microtask-Queue',
      desc:
        'Links steht der Aufrufstapel mit den Funktionen, die gerade laufen. Zuunterst liegt main.mjs, darauf showCatalog. ' +
        'Von showCatalog führt ein Pfeil nach rechts zu Timern und Anfragen, die der Browser oder Node übernimmt, ' +
        'etwa setTimeout und fetch. Ist ein Timer abgelaufen, kommt sein Callback in die Task-Queue darüber, ebenso Klicks. ' +
        'Promises legen ihre Fortsetzungen mit then und await in die Microtask-Queue ganz oben. ' +
        'Zwei nummerierte Pfeile führen zurück zum Aufrufstapel, der erste von der Microtask-Queue, der zweite von der Task-Queue. ' +
        'Ist der Stapel leer, holt die Ereignisschleife zuerst alle Microtasks und danach einen Task.',
      stack: 'Aufrufstapel',
      apis: ['Timer und Anfragen', 'im Browser oder in Node', 'setTimeout, fetch'],
      starts: 'startet',
      done: 'fertig',
      tasks: 'Task-Queue',
      microtasks: 'Microtask-Queue',
      taskEntries: ['Timer', 'Klick'],
      first: 'zuerst alle',
      then: 'dann einer',
      note: 'Ist der Stapel leer, holt die Ereignisschleife zuerst alle Microtasks, dann einen Task.',
    },
  },
  en: {
    references: {
      title: 'Two variables, one object',
      desc:
        'On the left are the variables tent, sameTent and copy, on the right two objects in memory. ' +
        'An arrow leads from tent and one from sameTent to the same object, in which availableFrom equals 2026-11-14. ' +
        'An arrow leads from copy to a second object, which was made with the spread operator ' +
        'and in which availableFrom is still null.',
      variables: 'Variables',
      objects: 'Objects in memory',
      name: 'Tent for four',
      same: [['tent', true], [' and ', false], ['sameTent', true], [' point to the same object', false]],
      copy: [['copy', true], [' points to a copy made with ', false], ['{ ...tent }', true]],
    },
    loop: {
      title: 'The event loop with task queue and microtask queue',
      desc:
        'On the left is the call stack with the functions that are running. At the bottom lies main.mjs, with showCatalog on top of it. ' +
        'An arrow leads right from showCatalog to timers and requests, which the browser or Node takes over, ' +
        'such as setTimeout and fetch. When a timer has run out, its callback goes into the task queue above, and so do clicks. ' +
        'Promises put their continuations from then and await into the microtask queue at the top. ' +
        'Two numbered arrows lead back to the call stack, the first from the microtask queue, the second from the task queue. ' +
        'When the stack is empty, the event loop takes all microtasks first and then one task.',
      stack: 'Call stack',
      apis: ['Timers and requests', 'in the browser or Node', 'setTimeout, fetch'],
      starts: 'starts',
      done: 'done',
      tasks: 'Task queue',
      microtasks: 'Microtask queue',
      taskEntries: ['Timer', 'Click'],
      first: 'all first',
      then: 'then one',
      note: 'When the stack is empty, the event loop takes all microtasks first, then one task.',
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

/** A line of prose and code parts that has to stay within the given width */
function mixedFitted(x, y, parts, width) {
  const needed = mixedWidth(parts);
  if (needed > width) {
    const text = parts.map(([part]) => part).join('');
    throw new Error(`"${text}" needs about ${Math.ceil(needed)} px but has only ${Math.floor(width)} px. Move or shorten it.`);
  }
  return mixed(x, y, parts);
}

const CARD_H = 44;
const CARD_GAP = 12;

function references(lang) {
  const t = TEXT[lang].references;
  const id = `p1c2-references-${lang}`;
  const vars = { x: 16, w: 220 };
  const objects = { x: 300, w: WIDTH - 16 - 300 };
  const varX = vars.x + 16;
  const varW = vars.w - 32;
  const objX = objects.x + 16;
  const objW = objects.w - 32;
  // tent and sameTent share one tall card, so both arrows run straight into the same object
  const rows = [56, 56 + CARD_H + CARD_GAP];
  const sharedBottom = rows[1] + CARD_H;
  const sameNote = sharedBottom + 22;
  const copyY = sameNote + 18;
  const copyNote = copyY + CARD_H + 22;
  const bottom = copyNote + 14;
  const centre = (y) => y + CARD_H / 2;
  const body = [
    band(vars.x, 16, vars.w, bottom - 16, 1),
    bandLabel(vars.x + 16, 40, t.variables, vars.w - 32),
    band(objects.x, 16, objects.w, bottom - 16, 2),
    bandLabel(objects.x + 16, 40, t.objects, objects.w - 32, { tone: 'blue' }),
    arrow(id, [[varX + varW, centre(rows[0])], [objX - 4, centre(rows[0])]], { accent: true }),
    arrow(id, [[varX + varW, centre(rows[1])], [objX - 4, centre(rows[1])]], { accent: true }),
    arrow(id, [[varX + varW, centre(copyY)], [objX - 4, centre(copyY)]]),
    tile(varX, rows[0], varW, CARD_H, 'tent'),
    tile(varX, rows[1], varW, CARD_H, 'sameTent'),
    tile(varX, copyY, varW, CARD_H, 'copy'),
    tile(objX, rows[0], objW, sharedBottom - rows[0], t.name, "availableFrom: '2026-11-14'", { accent: true, code: true, icon: 'box' }),
    mixedFitted(objX, sameNote, t.same, objW),
    tile(objX, copyY, objW, CARD_H, t.name, 'availableFrom: null', { code: true, icon: 'box' }),
    mixedFitted(objX, copyNote, t.copy, objW),
  ];
  return figure({ id, width: WIDTH, height: bottom + 16, title: t.title, desc: t.desc, body });
}

// Cards with one line, the calls on the stack and the entries of the queues
const ROW_H = 36;
const ENTRY_W = 96;
const QUEUE_H = 90;
// then and await continue code, the tasks come from a timer and a click
const ENTRY_ICONS = [
  ['code', 'code'],
  ['clock', 'cursor'],
];

function eventLoop(lang) {
  const t = TEXT[lang].loop;
  const id = `p1c4-loop-${lang}`;
  const stack = { x: 16, w: 196 };
  const stackRight = stack.x + stack.w;
  const frame = { x: stack.x + 16, w: stack.w - 32 };
  const column = { x: 332, w: WIDTH - 16 - 332 };
  // The microtasks come first, so their queue stands at the top, beside the free part of the stack
  const queues = [
    { name: t.microtasks, level: 2, tone: 'blue', step: '1', text: t.first, accent: true, entries: ['then', 'await'] },
    { name: t.tasks, level: 3, tone: 'violet', step: '2', text: t.then, accent: false, entries: t.taskEntries },
  ].map((queue, index) => ({ ...queue, y: 16 + index * (QUEUE_H + 16), icons: ENTRY_ICONS[index] }));
  const taskBottom = queues[1].y + QUEUE_H;
  // Timers and requests stand beside the two calls on the stack, the upper call starts them
  const apis = { x: WIDTH - 16 - 200, y: taskBottom + 40, w: 200, h: 2 * ROW_H + 8 };
  const stackBottom = apis.y + apis.h + 16;
  const bands = [band(stack.x, 16, stack.w, stackBottom - 16, 1), bandLabel(stack.x + 16, 40, t.stack, stack.w - 32)];
  const lines = [];
  const cards = [];
  queues.forEach((queue) => {
    bands.push(
      band(column.x, queue.y, column.w, QUEUE_H, queue.level),
      bandLabel(column.x + 16, queue.y + 24, queue.name, column.w - 32, { tone: queue.tone }),
    );
    const cardY = queue.y + 38;
    const cy = cardY + ROW_H / 2;
    // The event loop takes the entry at the head of the queue, the end next to the stack
    lines.push(
      arrow(id, [[column.x + 16, cy], [stackRight + 4, cy]], { accent: queue.accent }),
      badge(stackRight + 26, cy - 16, queue.step, { accent: queue.accent }),
      fitted(stackRight + 42, cy - 12, queue.text, column.x - stackRight - 42 - 12),
    );
    queue.entries.forEach((entry, index) => {
      cards.push(tile(column.x + 16 + index * (ENTRY_W + 8), cardY, ENTRY_W, ROW_H, entry, '', { icon: queue.icons[index] }));
    });
  });
  const startY = apis.y + ROW_H / 2;
  // A finished timer puts its callback at the end of the task queue, right of the waiting entries
  const doneX = apis.x + apis.w / 2;
  lines.push(
    arrow(id, [[frame.x + frame.w, startY], [apis.x - 4, startY]]),
    fitted((stackRight + apis.x) / 2, startY - 8, t.starts, apis.x - stackRight - 16, 'middle'),
    arrow(id, [[doneX, apis.y], [doneX, taskBottom + 4]]),
    fitted(doneX + 10, (apis.y + taskBottom) / 2 + 4, t.done, WIDTH - 16 - doneX - 10),
  );
  cards.push(
    tile(frame.x, apis.y, frame.w, ROW_H, 'showCatalog()', '', { icon: 'code' }),
    tile(frame.x, apis.y + ROW_H + 8, frame.w, ROW_H, 'main.mjs', '', { icon: 'doc' }),
    tile(apis.x, apis.y, apis.w, apis.h, t.apis[0], t.apis[1], { detail: t.apis[2], icon: 'clock' }),
  );
  const body = [...bands, ...lines, ...cards, strip(16, stackBottom + 24, WIDTH - 32, 30, t.note)];
  return figure({ id, width: WIDTH, height: stackBottom + 24 + 30 + 16, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) {
  save(lang, 'p1c2-references', references(lang));
  save(lang, 'p1c4-event-loop', eventLoop(lang));
}
