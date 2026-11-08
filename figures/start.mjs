/**
 * Figures of part 0, start. Writes one SVG per language into site/src/assets/figures/<lang>/.
 *
 *   node figures/start.mjs
 */
import { badge, figure, heading, save, tile, WIDTH } from './diagram.mjs';

const TEXT = {
  de: {
    title: 'Der Kurs im Überblick',
    desc:
      'Eine Reihe von Karten zeigt die Reihenfolge des Moduls von links nach rechts. Auf die Teile 0 bis 7 ' +
      'folgen die Prüfung und das Projekt mit Teil 8. Darunter stehen die Namen der Teile.',
    exam: 'Prüfung',
    project: ['Projekt', 'mit Teil 8'],
    parts: [
      'Start',
      'JavaScript für SPAs',
      'SPA-Grundlagen',
      'Einstieg in Vue',
      'Komponenten',
      'Reaktivität und Composables',
      'Routing',
      'Zustand und Daten',
    ],
  },
  en: {
    title: 'The course at a glance',
    desc:
      'A row of cards shows the order of the module from left to right. Parts 0 to 7 come first, followed by ' +
      'the exam and the project with part 8. The names of the parts are listed below.',
    exam: 'Exam',
    project: ['Project', 'with part 8'],
    parts: [
      'Getting started',
      'JavaScript for SPAs',
      'SPA basics',
      'Getting started with Vue',
      'Components',
      'Reactivity and composables',
      'Routing',
      'State and data',
    ],
  },
};

// The course pages name no lessons, the teacher sets the timing in class, so the cards only keep
// the order and leave the room to the labels
const TOP = 20;
const CARD_H = 48;
const PART_W = 40;
const PART_STEP = 48;

function courseMap(lang) {
  const t = TEXT[lang];
  const id = `p0c1-map-${lang}`;
  const body = [];
  t.parts.forEach((_, index) => body.push(tile(16 + index * PART_STEP, TOP, PART_W, CARD_H, String(index))));
  const examX = 16 + t.parts.length * PART_STEP + 4;
  body.push(tile(examX, TOP, 96, CARD_H, t.exam, '', { accent: true }));
  body.push(tile(examX + 108, TOP, WIDTH - 16 - (examX + 108), CARD_H, ...t.project));

  // The names of the parts in two columns, each with the number of its card
  const rows = 4;
  t.parts.forEach((name, index) => {
    const x = 16 + Math.floor(index / rows) * 332;
    const y = TOP + CARD_H + 36 + (index % rows) * 26;
    body.push(badge(x + 10, y - 4, String(index)), heading(x + 28, y, name));
  });
  const height = TOP + CARD_H + 36 + (rows - 1) * 26 + 22;
  return figure({ id, width: WIDTH, height, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) save(lang, 'p0c1-course-map', courseMap(lang));
