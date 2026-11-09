/**
 * Figure of unit J1, variables, types and operators: the variables of the counter helper with
 * their values and types, the drill in three variables and the days of a form field, whose text
 * Number() turns into a number.
 */
import { arrow, band, figure, fitted, label, labelWidth, meta, PADDING, room, SIZE, strip, tag, tagWidth, tile, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Variablen mit Wert und Typ',
    desc:
      'Links stehen die Variablen name, deposit, availableFrom, daysField und days, rechts ihre Werte mit dem Typ. ' +
      "name enthält den Text 'Bohrmaschine', deposit die Zahl 20 und availableFrom den Wert null. " +
      "daysField enthält den Text '4' aus einem Formularfeld. " +
      'Ein Pfeil mit Number(daysField) führt von diesem Text zu days, das die Zahl 4 enthält.',
    variables: 'Variablen',
    values: ['Werte', 'mit ihrem Typ'],
    form: 'aus einem Formularfeld',
    name: "'Bohrmaschine'",
    note: 'Ein Formularfeld liefert immer Text, erst Number() macht daraus eine Zahl.',
  },
  en: {
    title: 'Variables with value and type',
    desc:
      'On the left are the variables name, deposit, availableFrom, daysField and days, on the right their values with the type. ' +
      "name holds the string 'Drill', deposit the number 20 and availableFrom the value null. " +
      "daysField holds the string '4' from a form field. " +
      'An arrow with Number(daysField) leads from this string to days, which holds the number 4.',
    variables: 'Variables',
    values: ['Values', 'with their type'],
    form: 'from a form field',
    name: "'Drill'",
    note: 'A form field always delivers text, only Number() turns it into a number.',
  },
};

export const name = 'j1-variables-and-types';

const TOP = 16;
const ROW_H = 36;
const GAP = 8;

/** A card with a value in the monospace font and its type as a tag on the right */
function valueCard(x, y, w, h, value, type, accent) {
  const tw = tagWidth(type);
  room(value, w - 2 * PADDING - tw - 12, { size: SIZE.code, mono: true });
  return [
    `<rect class="d-shadow" x="${x}" y="${y + 1.5}" width="${w}" height="${h}" rx="10"/>`,
    `<rect class="d-tile${accent ? ' d-tile-accent' : ''}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`,
    fitted(x + PADDING + 4, y + h / 2 + 4, value, w - 2 * PADDING - tw - 12, 'start', { code: true }),
    tag(x + w - PADDING - tw, y + h / 2 - 9, type),
  ].join('\n');
}

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j1-variables-${lang}`;
  const left = { x: 16, w: 232 };
  const right = { x: 296, w: WIDTH - 16 - 296 };
  // Three rows for the drill, then the text of the form field and the number made from it
  const rows = [TOP + 40, TOP + 40 + ROW_H + GAP, TOP + 40 + 2 * (ROW_H + GAP)];
  const fieldRow = rows[2] + ROW_H + 30;
  const daysRow = fieldRow + ROW_H + 34;
  const bandH = daysRow + ROW_H + 16 - TOP;
  const varX = left.x + 16;
  const varW = left.w - 32;
  const valueX = right.x + 16;
  const valueW = right.w - 32;
  const lines = [
    ['name', t.name, 'string', rows[0]],
    ['deposit', '20', 'number', rows[1]],
    ['availableFrom', 'null', 'null', rows[2]],
    ['daysField', "'4'", 'string', fieldRow],
    ['days', '4', 'number', daysRow],
  ];
  const body = [
    band(left.x, TOP, left.w, bandH, 1),
    label(left.x + 16, TOP + 24, t.variables),
    band(right.x, TOP, right.w, bandH, 2),
    label(right.x + 16, TOP + 24, t.values[0], 'start', { tone: 'blue' }),
    meta(right.x + 16 + labelWidth(t.values[0]) + 12, TOP + 24, t.values[1]),
    fitted(varX, fieldRow - 10, t.form, varW),
  ];
  for (const [variable, value, type, y] of lines) {
    const centre = y + ROW_H / 2;
    body.push(arrow(id, [[varX + varW, centre], [valueX - 4, centre]]));
    body.push(tile(varX, y, varW, ROW_H, variable));
    body.push(valueCard(valueX, y, valueW, ROW_H, value, type, y === daysRow));
  }
  // Number() turns the text of the form field into the number in days
  const turn = valueX + 48;
  body.push(arrow(id, [[turn, fieldRow + ROW_H], [turn, daysRow - 4]], { accent: true }));
  body.push(fitted(turn + 12, fieldRow + ROW_H + 21, 'Number(daysField)', valueW - 60, 'start', { code: true }));
  body.push(strip(16, TOP + bandH + 16, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: TOP + bandH + 16 + 30 + 16, title: t.title, desc: t.desc, body });
}
