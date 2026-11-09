/**
 * Figure of unit J8, the DOM and events: a click on the reserve button of the projector rises from
 * the button through its entry to the list and on to the document. The one listener of the list
 * finds the button with closest and reads the id of the thing from dataset.
 */
import { arrow, badge, band, figure, fitted, label, labelWidth, meta, placeholder, strip, tag, tagWidth, tile, PADDING, WIDTH } from '../diagram.mjs';

const TEXT = {
  de: {
    title: 'Event-Delegation in der Liste',
    desc:
      'Links der Weg eines Klicks im DOM. Er trifft den Knopf Reservieren des Beamers mit data-id 6, steigt zu dessen Eintrag li auf, ' +
      'dann zur Liste ul mit der id items und weiter bis zum Dokument. Auf der Liste sitzt der einzige Listener. ' +
      'Rechts oben steht der Aufruf list.addEventListener, der ihn anmeldet, darunter in drei Schritten, was er mit dem Klick macht. ' +
      'event.target ist das angeklickte Element, closest liefert den Knopf oder null, ' +
      'und Number macht aus dataset.id die Zahl 6 des Beamers. So bedient ein Listener alle Knöpfe der Liste.',
    page: ['Seite', 'der Weg eines Klicks'],
    listener: ['Listener', 'einer für alle Knöpfe'],
    document: 'weiter bis zum Dokument',
    path: [
      ['Liste der Dinge', '<ul id="items">'],
      ['Eintrag Beamer', '<li>'],
      ['Knopf Reservieren', '<button data-id="6">'],
    ],
    rises: 'der Klick steigt auf',
    calls: 'ruft auf',
    register: "list.addEventListener('click', …)",
    steps: [
      ['Ziel des Klicks', 'event.target'],
      ['Knopf oder null', "target.closest('button')"],
      ['Ding 6, der Beamer', 'Number(button.dataset.id)'],
    ],
    note: 'Ein Listener auf der Liste bedient alle Knöpfe, auch solche, die später dazukommen.',
  },
  en: {
    title: 'Event delegation in the list',
    desc:
      'On the left the path of a click through the DOM. It hits the Reserve button of the projector with data-id 6, rises to its entry li, ' +
      'then to the list ul with the id items and on up to the document. The only listener sits on the list. ' +
      'At the top right is the call list.addEventListener that registers it, below it what the listener does with the click in three steps. ' +
      'event.target is the clicked element, closest returns the button or null, ' +
      'and Number turns dataset.id into the number 6 of the projector. This way one listener serves every button in the list.',
    page: ['Page', 'the path of a click'],
    listener: ['Listener', 'one for every button'],
    document: 'on up to the document',
    path: [
      ['List of things', '<ul id="items">'],
      ['Projector entry', '<li>'],
      ['Reserve button', '<button data-id="6">'],
    ],
    rises: 'the click rises',
    calls: 'calls',
    register: "list.addEventListener('click', …)",
    steps: [
      ['Target of the click', 'event.target'],
      ['Button or null', "target.closest('button')"],
      ['Thing 6, the projector', 'Number(button.dataset.id)'],
    ],
    note: 'One listener on the list serves every button, including buttons added later.',
  },
};

export const name = 'j8-event-delegation';

const TOP = 16;
const CARD_H = 44;
const DOC_H = 32;
const GAP = 24;
// Path cards from the list down to the button, the document sits above them
const ICONS = ['list', 'box', 'cursor'];

export function draw(lang) {
  const t = TEXT[lang];
  const id = `j8-delegation-${lang}`;
  const left = { x: 16, w: 292 };
  const right = { x: 356, w: WIDTH - 16 - 356 };
  const card = { x: left.x + 16, w: left.w - 32 };
  const docY = TOP + 40;
  const rows = [0, 1, 2].map((row) => docY + DOC_H + GAP + row * (CARD_H + GAP));
  const bandH = rows[2] + CARD_H + 16 - TOP;
  const middle = card.x + card.w / 2;
  const body = [
    band(left.x, TOP, left.w, bandH, 1),
    label(left.x + 16, TOP + 24, t.page[0]),
    meta(left.x + 16 + labelWidth(t.page[0]) + 12, TOP + 24, t.page[1]),
    band(right.x, TOP, right.w, bandH, 2),
    label(right.x + 16, TOP + 24, t.listener[0], 'start', { tone: 'blue' }),
    meta(right.x + 16 + labelWidth(t.listener[0]) + 12, TOP + 24, t.listener[1]),
    placeholder(card.x, docY, card.w, DOC_H, t.document),
  ];
  t.path.forEach(([title, code], row) => {
    body.push(tile(card.x, rows[row], card.w, CARD_H, title, code, { code: true, icon: ICONS[row], accent: row === 0 }));
  });
  // The list carries the listener, a tag says so
  const tw = tagWidth(t.listener[0]);
  body.push(tag(card.x + card.w - PADDING - tw, rows[0] + CARD_H / 2 - 9, t.listener[0]));
  // The click rises from the button to its entry, to the list and on to the document
  body.push(arrow(id, [[middle, rows[2]], [middle, rows[1] + CARD_H + 5.5]], { accent: true }));
  body.push(fitted(middle + 10, rows[1] + CARD_H + GAP / 2 + 4, t.rises, card.x + card.w - middle - 14));
  body.push(arrow(id, [[middle, rows[1]], [middle, rows[0] + CARD_H + 5.5]], { accent: true }));
  body.push(arrow(id, [[middle, rows[0]], [middle, docY + DOC_H + 4]], { dashed: true }));
  // The list calls its listener, which works in three steps
  const badgeX = right.x + 26;
  const stepX = right.x + 44;
  const stepW = right.x + right.w - 16 - stepX;
  const listY = rows[0] + CARD_H / 2;
  body.push(fitted(right.x + 16, docY + DOC_H / 2 + 4, t.register, right.w - 32, 'start', { code: true }));
  body.push(arrow(id, [[card.x + card.w, listY], [badgeX - 14, listY]], { accent: true }));
  body.push(fitted((left.x + left.w + right.x) / 2, listY - 8, t.calls, right.x - left.x - left.w - 8, 'middle'));
  t.steps.forEach(([title, code], row) => {
    body.push(badge(badgeX, rows[row] + CARD_H / 2, String(row + 1), { accent: row === 0 }));
    body.push(tile(stepX, rows[row], stepW, CARD_H, title, code, { code: true }));
  });
  const stripY = TOP + bandH + 16;
  body.push(strip(16, stripY, WIDTH - 32, 30, t.note));
  return figure({ id, width: WIDTH, height: stripY + 30 + 16, title: t.title, desc: t.desc, body });
}
