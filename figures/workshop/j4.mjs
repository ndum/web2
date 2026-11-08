/**
 * Figure of unit J4, objects and arrays: the raclette oven as an object with its keys and values,
 * and the array of the nine things on the shelf behind the counter, in which it stands at items[2].
 */
import { arrow, band, figure, fitted, label, labelWidth, meta, placeholder, room, SIZE, strip, tile, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Ein Ding als Objekt im Array',
    desc:
      'Links ein Objekt für den Raclette-Ofen mit den Schlüsseln id, name, deposit und availableFrom und ihren Werten 3, Raclette-Ofen, 30 und null. ' +
      'Ein Pfeil führt in ein Array mit den neun Dingen des Katalogs. Das Objekt steht dort an der dritten Stelle, items[2], ' +
      'nach der Bohrmaschine in items[0] und dem Zelt für vier Personen in items[1]. Die übrigen sechs Dinge stehen in items[3] bis items[8].',
    object: ['Objekt', 'ein Ding'],
    array: ['Array', 'der Katalog mit neun Dingen'],
    fields: ['id: 3', "name: 'Raclette-Ofen'", 'deposit: 30', 'availableFrom: null'],
    into: 'ins Array',
    items: ['Bohrmaschine', 'Zelt für vier Personen', 'Raclette-Ofen'],
    rest: 'sechs weitere Dinge in items[3] bis items[8]',
    note: 'Das Objekt kommt als drittes Element ins Array, an die Stelle items[2].',
  },
  en: {
    title: 'A thing as an object in the array',
    desc:
      'On the left an object for the raclette oven with the keys id, name, deposit and availableFrom and their values 3, Raclette oven, 30 and null. ' +
      'An arrow leads into an array with the nine things of the catalog. There the object stands in third place, at items[2], ' +
      'after the drill at items[0] and the tent for four at items[1]. The other six things stand at items[3] to items[8].',
    object: ['Object', 'one thing'],
    array: ['Array', 'the catalog with nine things'],
    fields: ['id: 3', "name: 'Raclette oven'", 'deposit: 30', 'availableFrom: null'],
    into: 'into the array',
    items: ['Drill', 'Tent for four', 'Raclette oven'],
    rest: 'six more things at items[3] to items[8]',
    note: 'The object becomes the third element of the array, at items[2].',
  },
};

export const name = 'j4-object-in-array';

const TOP = 16;
const BAND_H = 260;
const CARD_H = 44;
const GAP = 8;

/** A card that shows the keys and values of an object, one line of code each */
function objectCard(x, y, w, h, lines) {
  const body = [
    `<rect class="d-shadow" x="${x}" y="${y + 1.5}" width="${w}" height="${h}" rx="10"/>`,
    `<rect class="d-tile d-tile-accent" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`,
  ];
  const step = (h - 24) / lines.length;
  lines.forEach((text, index) => {
    room(text, w - 32, { size: SIZE.code, mono: true });
    body.push(fitted(x + 16, y + 16 + step * index + step / 2 + 4, text, w - 32, 'start', { code: true }));
  });
  return body.join('\n');
}

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j4-object-${lang}`;
  const left = { x: 16, w: 248 };
  const right = { x: 312, w: WIDTH - 16 - 312 };
  const rows = [0, 1, 2, 3].map((row) => TOP + 40 + row * (CARD_H + GAP));
  const target = rows[2] + CARD_H / 2;
  const objectH = 136;
  const objectY = target - objectH / 2;
  const body = [
    band(left.x, TOP, left.w, BAND_H, 1),
    label(left.x + 16, TOP + 24, t.object[0]),
    meta(left.x + 16 + labelWidth(t.object[0]) + 12, TOP + 24, t.object[1]),
    band(right.x, TOP, right.w, BAND_H, 2),
    label(right.x + 16, TOP + 24, t.array[0], 'start', { tone: 'blue' }),
    meta(right.x + 16 + labelWidth(t.array[0]) + 12, TOP + 24, t.array[1]),
    objectCard(left.x + 16, objectY, left.w - 32, objectH, t.fields),
  ];
  t.items.forEach((item, index) => {
    body.push(tile(right.x + 16, rows[index], right.w - 32, CARD_H, item, `items[${index}]`, { code: true, icon: 'box', accent: index === 2 }));
  });
  body.push(placeholder(right.x + 16, rows[3], right.w - 32, CARD_H, t.rest));
  // The object goes into the array at the third place
  const from = left.x + left.w - 16;
  const to = right.x + 16;
  body.push(arrow(id, [[from, target], [to - 4, target]], { accent: true }));
  body.push(fitted((from + to) / 2, target - 10, t.into, to - from - 8, 'middle'));
  body.push(strip(16, TOP + BAND_H + 16, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: TOP + BAND_H + 16 + 30 + 16, title: t.title, desc: t.desc, body });
}
