/**
 * Figure of unit J5, strings: three lines of the counter helper as rows of cards, first without
 * padding, where the amount starts at a different place in every row, then with padEnd, which adds
 * spaces until every name is as long as the longest one, so the amounts line up.
 */
import { band, figure, label, labelWidth, meta, placeholder, strip, tile, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Spalten mit padEnd',
    desc:
      'Oben drei Zeilen des Tresen-Helfers ohne Auffüllen, für die Bohrmaschine, das Zelt für vier Personen und den Beamer, ' +
      'je mit Nummer, Name, Pfand und dem Hinweis, ob das Ding da ist. Die Namen sind verschieden lang, ' +
      'darum beginnt der Betrag in jeder Zeile an einer anderen Stelle. Unten dieselben Zeilen mit padEnd. ' +
      'Es hängt an die Bohrmaschine 10 und an den Beamer 16 Leerzeichen an, bis jeder Name 22 Zeichen hat wie das Zelt. ' +
      'Jetzt stehen CHF 20, CHF 50 und CHF 80 genau untereinander.',
    without: ['Ohne Auffüllen', 'jeder Name so lang, wie er ist'],
    with: ['Mit padEnd', 'jeder Name 22 Zeichen lang'],
    spaces: (count) => `${count} Leerzeichen`,
    // Width of the name column in characters, the longest name of the nine things
    width: 22,
    // Pixels per character, so every name fits its card and every gap its label
    scale: 14,
    rows: [
      { id: 1, name: 'Bohrmaschine', deposit: 20, state: 'da' },
      { id: 2, name: 'Zelt für vier Personen', deposit: 50, state: 'ab 2026-11-12' },
      { id: 6, name: 'Beamer', deposit: 80, state: 'da' },
    ],
    note: 'padEnd füllt jeden Namen mit Leerzeichen auf 22 Zeichen auf, so steht CHF überall an derselben Stelle.',
  },
  en: {
    title: 'Columns with padEnd',
    desc:
      'At the top three lines of the counter helper without padding, for the drill, the beer bench set and the projector, ' +
      'each with number, name, deposit and whether the thing is in. The names differ in length, ' +
      'so the amount starts at a different place in every line. At the bottom the same lines with padEnd. ' +
      'It adds 9 spaces to the drill and 5 to the projector, until every name has 14 characters like the beer bench set. ' +
      'Now CHF 20, CHF 40 and CHF 80 line up exactly.',
    without: ['Without padding', 'every name as long as it is'],
    with: ['With padEnd', 'every name 14 characters long'],
    spaces: (count) => `${count} spaces`,
    width: 14,
    scale: 20,
    rows: [
      { id: 1, name: 'Drill', deposit: 20, state: 'in' },
      { id: 4, name: 'Beer bench set', deposit: 40, state: 'back 2026-11-03' },
      { id: 6, name: 'Projector', deposit: 80, state: 'in' },
    ],
    note: 'padEnd fills every name with spaces up to 14 characters, so CHF starts at the same place in every line.',
  },
};

export const name = 'j5-columns-with-padend';

const TOP = 16;
const ROW_H = 34;
const ROW_GAP = 8;
const GAP = 8;
const ID_W = 36;
const CHF_W = 80;
const STATE_W = 140;
const BAND_H = 40 + 3 * ROW_H + 2 * ROW_GAP + 16;

/** One band with its label and three rows, aligned pads every name to the same width */
function rows(t, y, aligned) {
  const x = 32;
  const [title, note] = aligned ? t.with : t.without;
  const body = [
    band(16, y, WIDTH - 32, BAND_H, aligned ? 2 : 1),
    label(x, y + 24, title, 'start', aligned ? { tone: 'blue' } : {}),
    meta(x + labelWidth(title) + 12, y + 24, note),
  ];
  t.rows.forEach((row, index) => {
    const top = y + 40 + index * (ROW_H + ROW_GAP);
    const nameX = x + ID_W + GAP;
    const nameW = row.name.length * t.scale;
    // Without padding the amount follows the name, with padding it follows the full column
    const end = aligned ? nameX + t.width * t.scale : nameX + nameW;
    const chfX = end + GAP;
    body.push(
      tile(x, top, ID_W, ROW_H, String(row.id)),
      tile(nameX, top, nameW, ROW_H, row.name),
      tile(chfX, top, CHF_W, ROW_H, `CHF ${row.deposit}`, '', { accent: aligned }),
      tile(chfX + CHF_W + GAP, top, STATE_W, ROW_H, row.state),
    );
    const missing = t.width - row.name.length;
    if (aligned && missing > 0) body.push(placeholder(nameX + nameW + 4, top, end - nameX - nameW - 4, ROW_H, t.spaces(missing)));
  });
  return body;
}

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j5-columns-${lang}`;
  const second = TOP + BAND_H + 16;
  const noteY = second + BAND_H + 16;
  const body = [...rows(t, TOP, false), ...rows(t, second, true), strip(16, noteY, WIDTH - 32, 30, t.note)];
  return figure({ id, width: WIDTH, height: noteY + 30 + 16, title: t.title, desc: t.desc, body });
}
