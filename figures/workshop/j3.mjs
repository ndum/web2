/**
 * Figure of unit J3, functions and scope: the closure of nextNumber in the counter helper. Three
 * calls in order on the left, makeNumbering('R') and two calls of nextNumber, and on the right the
 * one place where the closure keeps prefix and count, with the value of count after each call.
 */
import { arrow, badge, band, figure, fitted, label, labelWidth, meta, PADDING, strip, tile, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Die Closure von nextNumber',
    desc:
      "Links stehen drei Aufrufe der Reihe nach. Der erste, makeNumbering('R'), legt prefix und count an und gibt die Funktion nextNumber zurück. " +
      "Der zweite und der dritte rufen nextNumber auf und liefern 'R-1' und 'R-2'. " +
      "Rechts steht, was die Closure sich merkt, nach dem ersten Aufruf prefix gleich 'R' und count gleich 0, " +
      'nach dem zweiten count gleich 1 und nach dem dritten count gleich 2. Von jedem Aufruf führt ein Pfeil zur passenden Zeile.',
    calls: ['Aufrufe', 'der Reihe nach'],
    closure: ['Closure', 'eine Stelle im Speicher'],
    create: 'legt prefix und count an',
    returns: 'liefert',
    note: 'nextNumber merkt sich prefix und count aus dem Aufruf von makeNumbering, auch nachdem er fertig ist.',
  },
  en: {
    title: 'The closure of nextNumber',
    desc:
      "On the left are three calls in order. The first, makeNumbering('R'), creates prefix and count and returns the function nextNumber. " +
      "The second and the third call nextNumber and return 'R-1' and 'R-2'. " +
      "On the right is what the closure remembers, prefix equal to 'R' and count equal to 0 after the first call, " +
      'count equal to 1 after the second and count equal to 2 after the third. An arrow leads from each call to the matching line.',
    calls: ['Calls', 'in order'],
    closure: ['Closure', 'one place in memory'],
    create: 'creates prefix and count',
    returns: 'returns',
    note: 'nextNumber remembers prefix and count from the call of makeNumbering, even after it has finished.',
  },
};

export const name = 'j3-closure';

const TOP = 16;
const CARD_H = 44;
const GAP = 12;

/** The tall card of the closure, one line of code per call at the height of that call */
function closureCard(x, y, w, h, lines) {
  const body = [
    `<rect class="d-shadow" x="${x}" y="${y + 1.5}" width="${w}" height="${h}" rx="10"/>`,
    `<rect class="d-tile d-tile-violet" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`,
  ];
  for (const [text, centre] of lines) {
    body.push(fitted(x + PADDING + 4, centre + 4, text, w - 2 * PADDING - 8, 'start', { code: true }));
  }
  return body.join('\n');
}

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j3-closure-${lang}`;
  const left = { x: 16, w: 300 };
  const right = { x: 364, w: WIDTH - 16 - 364 };
  const rows = [0, 1, 2].map((row) => TOP + 40 + row * (CARD_H + GAP));
  const centres = rows.map((y) => y + CARD_H / 2);
  const bandH = rows[2] + CARD_H + 16 - TOP;
  const callX = left.x + 44;
  const callW = left.w - 44 - 16;
  const cardX = right.x + 16;
  const cardW = right.w - 32;
  const body = [
    band(left.x, TOP, left.w, bandH, 2),
    label(left.x + 16, TOP + 24, t.calls[0], 'start', { tone: 'blue' }),
    meta(left.x + 16 + labelWidth(t.calls[0]) + 12, TOP + 24, t.calls[1]),
    band(right.x, TOP, right.w, bandH, 3),
    label(right.x + 16, TOP + 24, t.closure[0], 'start', { tone: 'violet' }),
    meta(right.x + 16 + labelWidth(t.closure[0]) + 12, TOP + 24, t.closure[1]),
    closureCard(cardX, rows[0], cardW, rows[2] + CARD_H - rows[0], [
      ["prefix = 'R', count = 0", centres[0]],
      ["prefix = 'R', count = 1", centres[1]],
      ["prefix = 'R', count = 2", centres[2]],
    ]),
  ];
  const calls = [
    ["makeNumbering('R')", t.create],
    ['nextNumber()', `${t.returns} 'R-1'`],
    ['nextNumber()', `${t.returns} 'R-2'`],
  ];
  calls.forEach(([title, sub], index) => {
    body.push(badge(left.x + 26, centres[index], String(index + 1), { accent: index > 0 }));
    body.push(tile(callX, rows[index], callW, CARD_H, title, sub, { accent: index > 0 }));
    // The first call creates the variables, the next two reach back into them
    const tone = index > 0 ? { tone: 'violet' } : {};
    body.push(arrow(id, [[callX + callW, centres[index]], [cardX - 4, centres[index]]], tone));
  });
  body.push(strip(16, TOP + bandH + 16, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: TOP + bandH + 16 + 30 + 16, title: t.title, desc: t.desc, body });
}
