/**
 * remark-inline-figures: replaces a paragraph that holds only an image of a generated figure
 * (`![alt](.../assets/figures/<lang>/name.svg)`) with the SVG itself inside a <figure>.
 *
 * Inline SVG follows the site's light and dark theme through CSS variables, which an <img>
 * cannot. The figure's own <title> and <desc> carry the accessible name and description. The
 * Markdown alt text says the same as "<title>. <desc>", so the page stays understandable on
 * GitHub, and the build stops when a figure script changes one of them and the page lags behind.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { visit } from 'unist-util-visit';

const unescape = (text) => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

/** The alt text a figure needs, its title and its description as one text */
function altOf(svg) {
  const title = /<title[^>]*>([^<]*)<\/title>/.exec(svg)?.[1] ?? '';
  const desc = /<desc[^>]*>([^<]*)<\/desc>/.exec(svg)?.[1] ?? '';
  return `${unescape(title)}. ${unescape(desc)}`;
}

export default function remarkInlineFigures() {
  return function transformer(tree, file) {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index === undefined || node.children.length !== 1) return;
      const image = node.children[0];
      if (image.type !== 'image' || !/\/assets\/figures\/[^/]+\/[^/]+\.svg$/.test(image.url)) return;
      const path = resolve(dirname(file.path), image.url);
      let svg;
      try {
        svg = readFileSync(path, 'utf8').trim();
      } catch {
        file.fail(`Figure ${image.url} does not exist. Run the script in figures/ that draws it.`, node);
      }
      const alt = altOf(svg);
      if (image.alt !== alt) {
        let same = 0;
        while (same < alt.length && image.alt?.[same] === alt[same]) same += 1;
        file.fail(
          `The alt text of ${image.url} differs from the title and the description of the figure at ` +
            `"${(image.alt ?? '').slice(same, same + 40)}". It should read:\n${alt}`,
          node,
        );
      }
      parent.children[index] = { type: 'html', value: `<figure class="lt-figure fig">${svg}</figure>` };
    });
  };
}
