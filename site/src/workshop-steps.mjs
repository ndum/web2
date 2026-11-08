/**
 * The ten steps of the JS workshop, in which the counter helper grows, with the folder of the unit
 * and the short name of the step per language. The sidebar numbers the units J1 to J10
 * (route-data.js), and every unit opens with a strip of all ten steps (remark-learn-blocks).
 */
export const WORKSHOP_STEPS = [
  { slug: 'variables', de: 'Variablen', en: 'Variables' },
  { slug: 'control-flow', de: 'Kontrollstrukturen', en: 'Control flow' },
  { slug: 'functions', de: 'Funktionen', en: 'Functions' },
  { slug: 'objects-and-arrays', de: 'Objekte und Arrays', en: 'Objects and arrays' },
  { slug: 'strings', de: 'Strings', en: 'Strings' },
  { slug: 'classes', de: 'Klassen', en: 'Classes' },
  { slug: 'errors', de: 'Fehler', en: 'Errors' },
  { slug: 'dom-and-events', de: 'DOM und Events', en: 'DOM and events' },
  { slug: 'json', de: 'JSON', en: 'JSON' },
  { slug: 'formatting', de: 'Formatieren', en: 'Formatting' },
];

/** «J4» for the address of a unit of the workshop, an empty text for every other page */
export function stepNumberOf(href) {
  const match = /\/js\/([^/]+)\/$/.exec(href);
  const index = match ? WORKSHOP_STEPS.findIndex((step) => step.slug === match[1]) : -1;
  return index < 0 ? '' : `J${index + 1}`;
}
