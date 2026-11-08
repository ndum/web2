// Numbers the parts and their chapters in the navigation, such as «1 JavaScript für SPAs» and
// «1.4 Asynchrones JavaScript», so a reference to chapter 1.4 is easy to find, and the units of the
// JS workshop as «J1» to «J10», the numbers of the strip of steps on their pages. The page titles
// keep their wording. Competence grids and the groups without a part stay unnumbered.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

import { stepNumberOf } from './workshop-steps.mjs';

const PARTS = ['start', 'javascript', 'spa', 'vue', 'components', 'reactivity', 'routing', 'state', 'architecture'];

/** Number of the part a link belongs to, or -1 */
function partOf(href) {
  const folder = href.split('/').filter(Boolean).find((segment) => PARTS.includes(segment));
  return folder === undefined ? -1 : PARTS.indexOf(folder);
}

/** Puts J1 to J10 before the units of the workshop, which sit in a group inside a group */
function numberSteps(entries, numbered) {
  for (const entry of entries) {
    if (entry.type === 'group') numberSteps(entry.entries, numbered);
    else if (entry.type === 'link' && stepNumberOf(entry.href)) {
      entry.label = `${stepNumberOf(entry.href)} ${entry.label}`;
      numbered.set(entry.href, entry.label);
    }
  }
}

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const numbered = new Map();
  for (const group of route.sidebar) {
    if (group.type !== 'group') continue;
    let part = -1;
    let chapter = 0;
    for (const link of group.entries) {
      if (link.type !== 'link' || link.href.endsWith('/competences/')) continue;
      const number = partOf(link.href);
      if (number < 0) continue;
      part = number;
      chapter += 1;
      link.label = `${part}.${chapter} ${link.label}`;
      numbered.set(link.href, link.label);
    }
    if (part >= 0) group.label = `${part} ${group.label}`;
  }
  numberSteps(route.sidebar, numbered);
  // The links to the previous and the next page show the same numbers
  for (const key of ['prev', 'next']) {
    const link = route.pagination[key];
    if (link && numbered.has(link.href)) link.label = numbered.get(link.href);
  }
});
