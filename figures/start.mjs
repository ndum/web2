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

import { sketch } from './sketch.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// The blocks of the course in their order. The course pages name no lessons, the teacher sets the
// timing in class, so the widths only make room for the labels.
const BLOCKS = [
  { key: '0', width: 46 },
  { key: '1', width: 46 },
  { key: '2', width: 46 },
  { key: '3', width: 46 },
  { key: '4', width: 46 },
  { key: '5', width: 46 },
  { key: '6', width: 46 },
  { key: '7', width: 46 },
  { key: 'exam', width: 92 },
  { key: 'project', width: 220 },
];

const TEXT = {
  de: {
    title: 'Der Kurs im Überblick',
    desc:
      'Ein waagrechter Balken zeigt die Reihenfolge des Moduls. Auf die Teile 0 bis 7 folgen die Prüfung ' +
      'und das Projekt mit Teil 8. Unter dem Balken stehen die Namen der Teile.',
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
      'A horizontal bar shows the order of the module. Parts 0 to 7 come first, followed by the exam ' +
      'and the project with part 8. The names of the parts are listed below the bar.',
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
  const top = 20;
  const height = 44;
  const parts = [];

  let x = left;
  for (const block of BLOCKS) {
    const w = block.width;
    const strong = block.key === 'exam';
    parts.push(`<rect class="fig-box${strong ? ' fig-box-strong' : ''}" x="${x + 1}" y="${top}" width="${w - 2}" height="${height}" rx="4"/>`);
    const label = block.key === 'project' ? t.project : block.key === 'exam' ? t.exam : block.key;
    parts.push(`<text class="fig-text" x="${x + w / 2}" y="${top + 28}" text-anchor="middle">${escape(label)}</text>`);
    x += w;
  }

  // Names of the parts in two columns
  t.parts.forEach((name, index) => {
    const column = index < 4 ? 0 : 1;
    const row = index % 4;
    const x = left + column * 340;
    const y = 100 + row * 22;
    parts.push(`<text class="fig-sub" x="${x}" y="${y}"><tspan class="fig-strong">${index}</tspan>  ${escape(name)}</text>`);
  });

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 184" role="img" aria-labelledby="${id}-title ${id}-desc">`,
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
  writeFileSync(target, sketch(courseMap(lang), 'p0c1-course-map'));
}
