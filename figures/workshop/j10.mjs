/**
 * Figure of unit J10, formatting: the tent is available again from 2026-11-12, a date without a
 * time. JavaScript reads it as midnight in UTC, which is still the evening before in New York.
 */
import { arrow, band, figure, fitted, label, labelWidth, meta, strip, tile, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Ein Zeitpunkt in drei Zeitzonen',
    desc:
      'Links der Wert availableFrom des Zelts, der Text 2026-11-12 ohne Uhrzeit. new Date liest ihn als Mitternacht in UTC. ' +
      'Rechts derselbe Zeitpunkt in drei Zeitzonen. In UTC ist es der 12. November um Mitternacht, in Zürich der 12. November um 1 Uhr ' +
      'und in New York noch der 11. November um 19 Uhr. Mit timeZone UTC formatiert, zeigt ein Datum ohne Uhrzeit überall den 12. November.',
    value: ['Wert', 'availableFrom des Zelts'],
    display: ['Anzeige', 'je nach Zeitzone'],
    text: ['Datum ohne Uhrzeit', "'2026-11-12'"],
    instant: ['Mitternacht in UTC', '2026-11-12T00:00:00.000Z'],
    zones: [
      ['12.11.2026, 00:00', "'UTC'"],
      ['12.11.2026, 01:00', "'Europe/Zurich'"],
      ['11.11.2026, 19:00', "'America/New_York'"],
    ],
    note: "Ein Datum ohne Uhrzeit formatierst du mit timeZone: 'UTC', dann zeigt es überall den 12. November.",
  },
  en: {
    title: 'One point in time in three time zones',
    desc:
      'On the left the value availableFrom of the tent, the text 2026-11-12 without a time. new Date reads it as midnight in UTC. ' +
      'On the right the same point in time in three time zones. In UTC it is midnight on November 12, in Zurich 1 a.m. on November 12, ' +
      'and in New York still 7 p.m. on November 11. Formatted with timeZone UTC, a date without a time shows November 12 everywhere.',
    value: ['Value', 'availableFrom of the tent'],
    display: ['Display', 'depending on the time zone'],
    text: ['Date without a time', "'2026-11-12'"],
    instant: ['Midnight in UTC', '2026-11-12T00:00:00.000Z'],
    zones: [
      ['11/12/2026, 12:00 AM', "'UTC'"],
      ['11/12/2026, 1:00 AM', "'Europe/Zurich'"],
      ['11/11/2026, 7:00 PM', "'America/New_York'"],
    ],
    note: "Format a date without a time with timeZone: 'UTC', and it shows November 12 everywhere.",
  },
};

export const name = 'j10-time-zones';

const TOP = 16;
const CARD_H = 44;
const ROW_GAP = 12;
const ARROW_GAP = 40;
// New York is the zone where the date falls on the day before
const OTHER_DAY = 2;

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j10-zones-${lang}`;
  const left = { x: 16, w: 300 };
  const right = { x: 364, w: WIDTH - 16 - 364 };
  const card = { x: left.x + 16, w: left.w - 32 };
  const zone = { x: right.x + 16, w: right.w - 32 };
  const rows = [0, 1, 2].map((row) => TOP + 40 + row * (CARD_H + ROW_GAP));
  const bandH = rows[2] + CARD_H + 16 - TOP;
  // The value and the point in time sit in the middle of the left band
  const stack = CARD_H + ARROW_GAP + CARD_H;
  const textY = rows[0] + (rows[2] + CARD_H - rows[0] - stack) / 2;
  const instantY = textY + CARD_H + ARROW_GAP;
  const body = [
    band(left.x, TOP, left.w, bandH, 1),
    label(left.x + 16, TOP + 24, t.value[0]),
    meta(left.x + 16 + labelWidth(t.value[0]) + 12, TOP + 24, t.value[1]),
    band(right.x, TOP, right.w, bandH, 2),
    label(right.x + 16, TOP + 24, t.display[0], 'start', { tone: 'blue' }),
    meta(right.x + 16 + labelWidth(t.display[0]) + 12, TOP + 24, t.display[1]),
    tile(card.x, textY, card.w, CARD_H, ...t.text, { code: true, icon: 'doc' }),
    tile(card.x, instantY, card.w, CARD_H, ...t.instant, { code: true, icon: 'clock', accent: true }),
  ];
  // new Date turns the text into a point in time
  const arrowX = card.x + 30;
  body.push(arrow(id, [[arrowX, textY + CARD_H + 4], [arrowX, instantY - 4]]));
  body.push(fitted(arrowX + 12, textY + CARD_H + ARROW_GAP / 2 + 4, 'new Date(…)', card.w - 42, 'start', { code: true }));
  // The same point in time, formatted in three time zones. The violet arrow comes first, so the
  // grey ones cover the part all three share
  const from = [card.x + card.w, instantY + CARD_H / 2];
  const turn = (left.x + left.w + right.x) / 2;
  const order = [OTHER_DAY, ...[0, 1, 2].filter((row) => row !== OTHER_DAY)];
  for (const row of order) {
    const y = rows[row] + CARD_H / 2;
    body.push(arrow(id, [from, [turn, from[1]], [turn, y], [zone.x - 4, y]], { tone: row === OTHER_DAY ? 'violet' : '' }));
  }
  t.zones.forEach(([shown, timeZone], row) => {
    body.push(tile(zone.x, rows[row], zone.w, CARD_H, shown, timeZone, { code: true, icon: 'globe', tone: row === OTHER_DAY ? 'violet' : '' }));
  });
  const stripY = TOP + bandH + 16;
  body.push(strip(16, stripY, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: stripY + 30 + 16, title: t.title, desc: t.desc, body });
}
