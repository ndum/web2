/**
 * Figure of unit J6, classes: the class Reservation as a blueprint on the left, and the two objects
 * that new creates from it for M-117, each with its own values and the days its getter counts.
 */
import { arrow, band, figure, fitted, label, labelWidth, meta, room, SIZE, strip, tag, tagWidth, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Eine Klasse, zwei Objekte',
    desc:
      'Links die Klasse Reservation als Bauplan mit dem Konstruktor, dem Getter days und der Methode toString. ' +
      'Zwei Pfeile mit new führen zu zwei Objekten. R-1 hält den Beamer für M-117 vom 2026-11-07 bis 2026-11-11, ' +
      'R-2 die Festbankgarnitur für M-117 vom 2026-11-07 bis 2026-11-14. Der Getter days liefert 4 Tage für R-1 und 7 Tage für R-2. ' +
      'Die Werte gehören jedem Objekt selbst, die Methoden und der Getter stehen nur einmal in der Klasse.',
    blueprint: ['Klasse', 'der Bauplan'],
    objects: ['Objekte', 'mit new erzeugt'],
    days: (count) => `${count} Tage`,
    note: 'Die Werte gehören jedem Objekt selbst, die Methoden und der Getter days stehen nur einmal in der Klasse.',
  },
  en: {
    title: 'One class, two objects',
    desc:
      'On the left the class Reservation as a blueprint with the constructor, the getter days and the method toString. ' +
      'Two arrows marked new lead to two objects. R-1 holds the projector for M-117 from 2026-11-07 to 2026-11-11, ' +
      'R-2 the beer bench set for M-117 from 2026-11-07 to 2026-11-14. The getter days gives 4 days for R-1 and 7 days for R-2. ' +
      'The values belong to each object, while the methods and the getter exist only once, in the class.',
    blueprint: ['Class', 'the blueprint'],
    objects: ['Objects', 'created with new'],
    days: (count) => `${count} days`,
    note: 'The values belong to each object, while the methods and the getter days exist only once, in the class.',
  },
};

export const name = 'j6-class-and-objects';

const CLASS_LINES = ['class Reservation', 'constructor(...)', 'get days()', 'toString()'];
const OBJECTS = [
  { lines: ["number: 'R-1'", 'item: projector', "member: 'M-117'", "from: '2026-11-07'", "to: '2026-11-11'"], days: 4 },
  { lines: ["number: 'R-2'", 'item: benchSet', "member: 'M-117'", "from: '2026-11-07'", "to: '2026-11-14'"], days: 7 },
];

const TOP = 16;
const LINE = 18;
const GAP = 16;
const OBJECT_H = OBJECTS[0].lines.length * LINE + 24;
const BAND_H = 40 + 2 * OBJECT_H + GAP + 16;

/** A card with one line of code per row, as an object or a class looks in the editor */
function codeCard(x, y, w, lines, { accent = false } = {}) {
  const h = lines.length * LINE + 24;
  const body = [
    `<rect class="d-shadow" x="${x}" y="${y + 1.5}" width="${w}" height="${h}" rx="10"/>`,
    `<rect class="d-tile${accent ? ' d-tile-accent' : ''}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`,
  ];
  lines.forEach((text, index) => {
    room(text, w - 32, { size: SIZE.code, mono: true });
    body.push(fitted(x + 16, y + 12 + LINE * index + LINE / 2 + 4, text, w - 32, 'start', { code: true }));
  });
  return body.join('\n');
}

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j6-objects-${lang}`;
  const left = { x: 16, w: 264 };
  const right = { x: 336, w: WIDTH - 16 - 336 };
  const classH = CLASS_LINES.length * LINE + 24;
  const classY = TOP + 40 + (2 * OBJECT_H + GAP - classH) / 2;
  const classRight = left.x + left.w - 16;
  const objectX = right.x + 16;
  const objectW = right.w - 32;
  const elbow = (classRight + objectX) / 2;
  const body = [
    band(left.x, TOP, left.w, BAND_H, 1),
    label(left.x + 16, TOP + 24, t.blueprint[0]),
    meta(left.x + 16 + labelWidth(t.blueprint[0]) + 12, TOP + 24, t.blueprint[1]),
    band(right.x, TOP, right.w, BAND_H, 2),
    label(objectX, TOP + 24, t.objects[0], 'start', { tone: 'blue' }),
    meta(objectX + labelWidth(t.objects[0]) + 12, TOP + 24, t.objects[1]),
  ];
  // new runs from the class to every object, the arrows split at the gap between the bands
  OBJECTS.forEach((object, index) => {
    const y = TOP + 40 + index * (OBJECT_H + GAP);
    const centre = y + OBJECT_H / 2;
    body.push(arrow(id, [[classRight, classY + classH / 2], [elbow, classY + classH / 2], [elbow, centre], [objectX - 4, centre]], { accent: true }));
    body.push(fitted(elbow + 6, centre - 8, 'new', objectX - elbow - 10, 'start', { code: true }));
  });
  body.push(codeCard(left.x + 16, classY, left.w - 32, CLASS_LINES, { accent: true }));
  OBJECTS.forEach((object, index) => {
    const y = TOP + 40 + index * (OBJECT_H + GAP);
    const days = t.days(object.days);
    body.push(codeCard(objectX, y, objectW, object.lines));
    body.push(tag(objectX + objectW - tagWidth(days) - 12, y + 12, days));
  });
  body.push(strip(16, TOP + BAND_H + 16, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: TOP + BAND_H + 16 + 30 + 16, title: t.title, desc: t.desc, body });
}
