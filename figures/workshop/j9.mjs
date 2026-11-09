/**
 * Figure of unit J9, JSON: a reservation of the projector goes through JSON.stringify into one string
 * and through JSON.parse back into a new object. The date comes back as a string, and the field with
 * undefined is gone.
 */
import { arrow, band, figure, fitted, label, labelWidth, meta, placeholder, strip, tile, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Eine Reservation durch JSON und zurück',
    desc:
      'Oben die Reservation als Objekt mit den Feldern itemId 6, member M-117, from als Date für den 7. November 2026, days 4 und note mit dem Wert undefined. ' +
      'JSON.stringify macht daraus einen einzigen String. Darin steht from als Text im Format ISO 8601, und note fehlt. ' +
      'JSON.parse liest den String als neues Objekt. Dort ist from ein String und kein Date mehr, und das Feld note gibt es nicht.',
    object: ['Objekt', 'die Reservation im Programm'],
    json: ['JSON', 'ein einziger String'],
    back: ['Neues Objekt', 'aus dem String gelesen'],
    missing: 'note fehlt',
    note: 'Aus dem Date wird ein String, und das Feld mit undefined fehlt.',
  },
  en: {
    title: 'A reservation through JSON and back',
    desc:
      'At the top the reservation as an object with the fields itemId 6, member M-117, from as a Date for November 7, 2026, days 4 and note with the value undefined. ' +
      'JSON.stringify turns it into one single string, in which from is text in ISO 8601 format and note is missing. ' +
      'JSON.parse reads the string into a new object. There from is a string and no longer a Date, and the field note does not exist.',
    object: ['Object', 'the reservation in the program'],
    json: ['JSON', 'one single string'],
    back: ['New object', 'read from the string'],
    missing: 'note is gone',
    note: 'The Date turns into a string, and the field holding undefined is gone.',
  },
};

export const name = 'j9-json-round-trip';

// The fields of the reservation before and after, the same in both languages because they are code
const BEFORE = [['itemId', '6'], ['member', "'M-117'"], ['from', "new Date('2026-11-07')"], ['days', '4'], ['note', 'undefined']];
const AFTER = [['itemId', '6'], ['member', "'M-117'"], ['from', "'2026-11-07T00:00:00.000Z'"], ['days', '4']];
const TEXT_LINE = '{"itemId":6,"member":"M-117","from":"2026-11-07T00:00:00.000Z","days":4}';
const WIDTHS = [84, 104, 200, 76, 104];
const FROM = 2;

const TOP = 16;
const BAND_H = 96;
const GAP_Y = 36;
const CARD_H = 44;
const GAP_X = 12;

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j9-json-${lang}`;
  const inner = { x: 32, w: WIDTH - 64 };
  const bands = [0, 1, 2].map((row) => TOP + row * (BAND_H + GAP_Y));
  const cardY = (row) => bands[row] + 38;
  const columns = [];
  let x = inner.x;
  for (const w of WIDTHS) {
    columns.push({ x, w });
    x += w + GAP_X;
  }
  const head = (row, [text, more], tone) => [
    label(inner.x, bands[row] + 24, text, 'start', tone ? { tone } : {}),
    meta(inner.x + labelWidth(text) + 12, bands[row] + 24, more),
  ];
  const body = [
    band(16, bands[0], WIDTH - 32, BAND_H, 1),
    ...head(0, t.object),
    band(16, bands[1], WIDTH - 32, BAND_H, 2),
    ...head(1, t.json, 'blue'),
    band(16, bands[2], WIDTH - 32, BAND_H, 1),
    ...head(2, t.back),
  ];
  BEFORE.forEach(([key, value], index) => {
    const c = columns[index];
    body.push(tile(c.x, cardY(0), c.w, CARD_H, key, value, { code: true, accent: index === FROM }));
  });
  body.push(tile(inner.x, cardY(1), inner.w, CARD_H, 'text', TEXT_LINE, { code: true, icon: 'doc' }));
  AFTER.forEach(([key, value], index) => {
    const c = columns[index];
    body.push(tile(c.x, cardY(2), c.w, CARD_H, key, value, { code: true, accent: index === FROM }));
  });
  const last = columns[columns.length - 1];
  body.push(placeholder(last.x, cardY(2), last.w, CARD_H, t.missing));
  // JSON.stringify writes the string, JSON.parse reads it into a new object
  const arrowX = inner.x + 24;
  const calls = ['JSON.stringify(reservation)', 'JSON.parse(text)'];
  calls.forEach((call, row) => {
    const from = bands[row] + BAND_H + 4;
    const to = bands[row + 1] - 4;
    body.push(arrow(id, [[arrowX, from], [arrowX, to]], { accent: true }));
    body.push(fitted(arrowX + 12, (from + to) / 2 + 4, call, inner.w - 36, 'start', { code: true }));
  });
  const stripY = bands[2] + BAND_H + 16;
  body.push(strip(16, stripY, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: stripY + 30 + 16, title: t.title, desc: t.desc, body });
}
