/**
 * Figure of unit J2, control flow: the loop of the counter helper over the seven days of the week,
 * one pass per day, and the condition that prints only Wednesday and Saturday, the days the counter
 * is open.
 */
import { arrow, badge, band, figure, label, labelWidth, meta, placeholder, strip, tile, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Die Schleife über die Woche',
    desc:
      'Links stehen die sieben Tage der Woche von Montag bis Sonntag, nummeriert von 1 bis 7 in der Reihenfolge, ' +
      'in der die Schleife sie durchgeht. Rechts steht, was der Tresen-Helfer ausgibt. ' +
      'Vom Mittwoch und vom Samstag führt je ein Pfeil zu «Offen am Mittwoch» und «Offen am Samstag». ' +
      'Bei den anderen fünf Tagen steht «keine Ausgabe» in einem gestrichelten Rahmen.',
    loop: ['Schleife', 'ein Tag pro Durchgang'],
    output: ['Ausgabe', 'nur wenn die Bedingung gilt'],
    week: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    open: 'Offen am',
    none: 'keine Ausgabe',
    note: 'for...of nimmt einen Tag nach dem anderen, if lässt nur Mittwoch und Samstag durch.',
  },
  en: {
    title: 'The loop over the week',
    desc:
      'On the left are the seven days of the week from Monday to Sunday, numbered 1 to 7 in the order ' +
      'in which the loop goes through them. On the right is what the counter helper prints. ' +
      'An arrow leads from Wednesday to "Open on Wednesday" and one from Saturday to "Open on Saturday". ' +
      'For the other five days a dashed frame says "no output".',
    loop: ['Loop', 'one day per pass'],
    output: ['Output', 'only when the condition holds'],
    week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    open: 'Open on',
    none: 'no output',
    note: 'for...of takes one day after the other, if lets only Wednesday and Saturday through.',
  },
};

export const name = 'j2-loop-over-week';

const TOP = 16;
const ROW_H = 30;
const GAP = 6;
// Wednesday and Saturday, the days the counter is open
const OPEN = new Set([2, 5]);

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j2-week-${lang}`;
  const left = { x: 16, w: 240 };
  const right = { x: 288, w: WIDTH - 16 - 288 };
  const rows = t.week.map((_, index) => TOP + 40 + index * (ROW_H + GAP));
  const bandH = rows[6] + ROW_H + 16 - TOP;
  const dayX = left.x + 44;
  const dayW = left.w - 44 - 16;
  const outX = right.x + 16;
  const outW = right.w - 32;
  const body = [
    band(left.x, TOP, left.w, bandH, 1),
    label(left.x + 16, TOP + 24, t.loop[0]),
    meta(left.x + 16 + labelWidth(t.loop[0]) + 12, TOP + 24, t.loop[1]),
    band(right.x, TOP, right.w, bandH, 2),
    label(right.x + 16, TOP + 24, t.output[0], 'start', { tone: 'blue' }),
    meta(right.x + 16 + labelWidth(t.output[0]) + 12, TOP + 24, t.output[1]),
  ];
  t.week.forEach((day, index) => {
    const y = rows[index];
    const open = OPEN.has(index);
    body.push(badge(left.x + 26, y + ROW_H / 2, String(index + 1), { accent: open }));
    body.push(tile(dayX, y, dayW, ROW_H, day, '', { accent: open }));
    if (open) {
      body.push(arrow(id, [[dayX + dayW, y + ROW_H / 2], [outX - 4, y + ROW_H / 2]], { accent: true }));
      body.push(tile(outX, y, outW, ROW_H, `${t.open} ${day}`, '', { accent: true }));
    } else {
      body.push(placeholder(outX, y, outW, ROW_H, t.none));
    }
  });
  body.push(strip(16, TOP + bandH + 16, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: TOP + bandH + 16 + 30 + 16, title: t.title, desc: t.desc, body });
}
