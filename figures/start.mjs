/**
 * Figures of part 0, start. Writes one SVG per language into site/src/assets/figures/<lang>/.
 * Colours come from classes that site/src/styles/course.css maps to the theme variables of the
 * site, so the inlined figures follow light and dark mode.
 *
 *   node figures/start.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Lessons of every block of the course, see the lesson plan of the course outline
const BLOCKS = [
  { key: '0', from: 1, to: 2 },
  { key: '1', from: 3, to: 6 },
  { key: '2', from: 7, to: 9 },
  { key: '3', from: 10, to: 13 },
  { key: '4', from: 14, to: 18 },
  { key: '5', from: 19, to: 21 },
  { key: '6', from: 22, to: 24 },
  { key: '7', from: 25, to: 28 },
  { key: 'exam', from: 29, to: 30 },
  { key: 'project', from: 31, to: 50 },
];

const TEXT = {
  de: {
    title: 'Der Kurs im Überblick',
    desc:
      'Ein waagrechter Balken zeigt die 50 Lektionen des Moduls. Die Teile 0 bis 7 füllen die Lektionen 1 bis 28, ' +
      'die Prüfung liegt in den Lektionen 29 und 30, das Projekt mit Teil 8 nimmt die Lektionen 31 bis 50 ein. ' +
      'Unter dem Balken stehen die Namen der Teile.',
    lessons: 'Lektion',
    exam: 'Prüfung',
    project: 'Projekt mit Teil 8',
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
      'A horizontal bar shows the 50 lessons of the module. Parts 0 to 7 fill lessons 1 to 28, ' +
      'the exam takes lessons 29 and 30, and the project with part 8 takes lessons 31 to 50. ' +
      'The names of the parts are listed below the bar.',
    lessons: 'Lesson',
    exam: 'Exam',
    project: 'Project with part 8',
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

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function courseMap(lang) {
  const t = TEXT[lang];
  const id = `p0c1-map-${lang}`;
  const left = 20;
  const width = 680;
  const perLesson = width / 50;
  const top = 34;
  const height = 44;
  const parts = [];

  for (const block of BLOCKS) {
    const x = left + (block.from - 1) * perLesson;
    const w = (block.to - block.from + 1) * perLesson;
    const strong = block.key === 'exam';
    parts.push(`<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${x + 1}" y="${top}" width="${w - 2}" height="${height}" rx="4"/>`);
    const label = block.key === 'project' ? t.project : block.key === 'exam' ? '' : block.key;
    if (label) parts.push(`<text class="fig-text" x="${x + w / 2}" y="${top + 28}" text-anchor="middle">${escape(label)}</text>`);
    if (block.key === 'exam') {
      parts.push(`<text class="fig-sub" x="${x + w / 2}" y="${top - 8}" text-anchor="middle">${escape(t.exam)}</text>`);
    }
  }

  // Lesson numbers below the bar
  for (const lesson of [1, 10, 20, 30, 40, 50]) {
    const x = left + (lesson - 0.5) * perLesson;
    parts.push(`<text class="fig-sub" x="${x}" y="${top + height + 18}" text-anchor="middle">${lesson}</text>`);
  }
  parts.push(`<text class="fig-sub" x="${left}" y="${top + height + 36}">${escape(t.lessons)}</text>`);

  // Names of the parts in two columns
  t.parts.forEach((name, index) => {
    const column = index < 4 ? 0 : 1;
    const row = index % 4;
    const x = left + column * 340;
    const y = 160 + row * 22;
    parts.push(`<text class="fig-sub" x="${x}" y="${y}"><tspan class="fig-strong">${index}</tspan>  ${escape(name)}</text>`);
  });

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 248" role="img" aria-labelledby="${id}-title ${id}-desc">`,
    `<title id="${id}-title">${escape(t.title)}</title>`,
    `<desc id="${id}-desc">${escape(t.desc)}</desc>`,
    ...parts,
    '</svg>',
    '',
  ].join('\n');
}

for (const lang of Object.keys(TEXT)) {
  const target = join(ROOT, 'site', 'src', 'assets', 'figures', lang, 'p0c1-course-map.svg');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, courseMap(lang));
}
