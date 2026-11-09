/**
 * Figure of unit J7, errors: the three checks of checkRequest in the try block, one below the other,
 * and for each of them the request of the counter helper that fails there and lands in the catch
 * block, while the last request passes all three and is accepted.
 */
import { arrow, band, figure, fitted, label, labelWidth, meta, placeholder, strip, tile, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Eine Anfrage durch checkRequest',
    desc:
      'Links im Block try die drei Prüfungen von checkRequest untereinander, Mittwoch oder Samstag, höchstens sieben Tage und Ding noch frei, ' +
      'darunter angenommen. Wer eine Prüfung besteht, geht mit ja zur nächsten. Von jeder Prüfung führt ein Pfeil mit throw nach rechts ' +
      'in den Block catch zu der Anfrage, die dort scheitert. Die Bohrmaschine vom 2026-11-09 bis 2026-11-11 scheitert an der ersten Prüfung, ' +
      'der Raclette-Ofen vom 2026-11-07 bis 2026-11-18 an der zweiten und der Beamer vom 2026-11-07 bis 2026-11-11 an der dritten. ' +
      'Der Beamer vom 2026-11-11 bis 2026-11-14 besteht alle drei und wird angenommen, für ihn bleibt catch leer.',
    tryMeta: 'die Prüfungen der Reihe nach',
    catchMeta: 'abgelehnt mit Grund',
    checks: [
      ['Mittwoch oder Samstag', 'isOpenOn(from), isOpenOn(to)', 'calendar'],
      ['Höchstens sieben Tage', 'loanDays(from, to)', 'clock'],
      ['Ding noch frei', 'for (const other of reservations)', 'box'],
    ],
    accepted: ['Beamer angenommen', '2026-11-11 bis 2026-11-14'],
    declined: [
      ['Bohrmaschine', '2026-11-09 bis 2026-11-11'],
      ['Raclette-Ofen', '2026-11-07 bis 2026-11-18'],
      ['Beamer', '2026-11-07 bis 2026-11-11'],
    ],
    yes: 'ja',
    nothing: 'kein throw, catch läuft nicht',
    note: 'throw verlässt checkRequest sofort, die übrigen Prüfungen laufen nicht mehr.',
  },
  en: {
    title: 'A request through checkRequest',
    desc:
      'On the left, in the try block, the three checks of checkRequest one below the other, Wednesday or Saturday, at most seven days and thing still free, ' +
      'with accepted below them. A request that passes a check goes on to the next one with yes. From every check an arrow marked throw leads right ' +
      'into the catch block to the request that fails there. The drill from 2026-11-09 to 2026-11-11 fails the first check, ' +
      'the raclette oven from 2026-11-07 to 2026-11-18 the second and the projector from 2026-11-07 to 2026-11-11 the third. ' +
      'The projector from 2026-11-11 to 2026-11-14 passes all three and is accepted, catch stays empty for it.',
    tryMeta: 'the checks in order',
    catchMeta: 'declined with a reason',
    checks: [
      ['Wednesday or Saturday', 'isOpenOn(from), isOpenOn(to)', 'calendar'],
      ['At most seven days', 'loanDays(from, to)', 'clock'],
      ['Thing still free', 'for (const other of reservations)', 'box'],
    ],
    accepted: ['Projector accepted', '2026-11-11 to 2026-11-14'],
    declined: [
      ['Drill', '2026-11-09 to 2026-11-11'],
      ['Raclette oven', '2026-11-07 to 2026-11-18'],
      ['Projector', '2026-11-07 to 2026-11-11'],
    ],
    yes: 'yes',
    nothing: 'no throw, catch does not run',
    note: 'throw leaves checkRequest at once, the remaining checks no longer run.',
  },
};

export const name = 'j7-check-request';

const TOP = 16;
const TILE_H = 44;
const ROW_GAP = 28;
const BAND_H = 40 + 4 * TILE_H + 3 * ROW_GAP + 16;

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j7-check-${lang}`;
  const left = { x: 16, w: 320 };
  const right = { x: 384, w: WIDTH - 16 - 384 };
  const leftX = left.x + 16;
  const leftW = left.w - 32;
  const rightX = right.x + 16;
  const rightW = right.w - 32;
  const rowY = (index) => TOP + 40 + index * (TILE_H + ROW_GAP);
  const body = [
    band(left.x, TOP, left.w, BAND_H, 2),
    label(leftX, TOP + 24, 'try', 'start', { tone: 'blue' }),
    meta(leftX + labelWidth('try') + 12, TOP + 24, t.tryMeta),
    band(right.x, TOP, right.w, BAND_H, 3),
    label(rightX, TOP + 24, 'catch', 'start', { tone: 'violet' }),
    meta(rightX + labelWidth('catch') + 12, TOP + 24, t.catchMeta),
  ];
  const down = leftX + leftW / 2;
  t.checks.forEach(([title, code, icon], index) => {
    const y = rowY(index);
    const centre = y + TILE_H / 2;
    // A passed check leads down to the next one, a failed one throws across into catch
    body.push(arrow(id, [[down, y + TILE_H], [down, rowY(index + 1) - 4]], { accent: true }));
    body.push(fitted(down + 8, y + TILE_H + ROW_GAP / 2 + 4, t.yes, leftW / 2 - 16));
    body.push(arrow(id, [[leftX + leftW, centre], [rightX - 4, centre]], { tone: 'violet' }));
    body.push(fitted((leftX + leftW + rightX) / 2, centre - 8, 'throw', rightX - leftX - leftW - 8, 'middle', { code: true }));
    body.push(tile(leftX, y, leftW, TILE_H, title, code, { code: true, icon }));
    const [thing, dates] = t.declined[index];
    body.push(tile(rightX, y, rightW, TILE_H, thing, dates, { code: true, icon: 'cross', tone: 'violet' }));
  });
  const last = rowY(3);
  body.push(tile(leftX, last, leftW, TILE_H, t.accepted[0], t.accepted[1], { code: true, icon: 'check', accent: true }));
  body.push(placeholder(rightX, last, rightW, TILE_H, t.nothing));
  body.push(strip(16, TOP + BAND_H + 16, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: TOP + BAND_H + 16 + 30 + 16, title: t.title, desc: t.desc, body });
}
