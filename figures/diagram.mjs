/**
 * Building blocks of the course figures: cards, bands, strips, labels, lines and arrows with exact
 * coordinates, plus a small set of line icons. The figure scripts compose them, and
 * site/src/styles/course.css maps the d-* classes to colours for light and dark mode, so the
 * inlined figures follow the theme of the site and use the font of the pages.
 *
 * Every text is measured with an estimate of the font. A text that does not fit its card, the room
 * a script gives it or the figure stops the script with a message, so a longer translation cannot
 * run over a border.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const escape = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const unescape = (text) => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** Font sizes in px, course.css sets the same values for the d-* classes */
export const SIZE = { title: 13, small: 12, sub: 11, code: 11, label: 11 };
/** Space between a text and the border of its card, on each side */
export const PADDING = 12;
/** Size of an icon in a card */
export const ICON = 18;
/** Where the text of a card with an icon starts, measured from the left border of the card */
export const ICON_SPACE = PADDING + ICON + 10;
/** The usual width of a figure, at the width of the text column it is drawn close to its real size */
export const WIDTH = 680;
/** Space a free text keeps from the border of the figure */
const MARGIN = 6;
/** Letter spacing of the labels in small capitals, as a share of the font size */
const LABEL_SPACING = 0.08;

// Approximate advance widths of a sans-serif font as a share of the font size
const NARROW = new Set("iljtfrI.,:;'|!()[] ");
const WIDE = new Set('mwMW');

/** Estimated width of a text in px, bold adds about 6 percent, code uses a monospace advance */
export function measure(text, size, { bold = false, mono = false } = {}) {
  if (mono) return String(text).length * size * 0.6;
  let width = 0;
  for (const char of String(text)) {
    if (NARROW.has(char)) width += 0.3;
    else if (WIDE.has(char)) width += 0.86;
    else if (/[A-ZÄÖÜ]/.test(char)) width += 0.68;
    else if (/[0-9]/.test(char)) width += 0.58;
    else width += 0.55;
  }
  return width * size * (bold ? 1.06 : 1);
}

/** Width of a label in small capitals, measure() does not know its letter spacing */
export const labelWidth = (text) =>
  measure(String(text).toUpperCase(), SIZE.label, { bold: true }) + String(text).length * LABEL_SPACING * SIZE.label;

/** Stops the figure script when a text does not fit the given width with padding on both sides */
function fit(text, available, size, options = {}) {
  const needed = measure(text, size, options) + 2 * PADDING;
  if (needed > available) {
    throw new Error(`"${text}" needs about ${Math.ceil(needed)} px but has only ${Math.floor(available)} px. Widen the card or shorten the text.`);
  }
}

/** Stops the figure script when a free text is wider than the room it has */
export function room(text, width, { size = SIZE.sub, bold = false, mono = false } = {}) {
  const needed = measure(text, size, { bold, mono });
  if (needed > width) {
    throw new Error(`"${text}" needs about ${Math.ceil(needed)} px but has only ${Math.floor(width)} px. Move or shorten it.`);
  }
}

/**
 * Line icons on a grid of 24, drawn with the stroke of their card. They are simple shapes of their
 * own, so the figures need no icon library.
 */
const ICONS = {
  server: '<rect x="4" y="4" width="16" height="7" rx="1.5"/><rect x="4" y="13" width="16" height="7" rx="1.5"/><path d="M8 7.5h.01M8 16.5h.01"/>',
  client: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  browser: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  box: '<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
  block: '<rect x="3.5" y="7" width="17" height="13" rx="2"/><path d="M8 7V4h3v3M13 7V4h3v3"/>',
  layers: '<path d="M12 3.5 21 8l-9 4.5L3 8z"/><path d="M3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5"/>',
  network: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
  repo: '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="9" r="2.5"/><path d="M6 8.5v7M18 11.5c0 3-6 2-10.5 5"/>',
  sync: '<path d="M20 12a8 8 0 0 1-14.3 4.9M4 12A8 8 0 0 1 18.3 7.1"/><path d="M18.5 3v4.3h-4.3M5.5 21v-4.3h4.3"/>',
  chart: '<path d="M4 20h16"/><path d="M7 16v-4M12 16V8M17 16v-7"/>',
  sigma: '<path d="M17.5 5.5V4h-11l6 8-6 8h11v-1.5"/>',
  logs: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2.5 2.5M14 9l1.5 1.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  group: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
  database: '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.5"/><path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13"/><path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5"/>',
  disk: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 14h.01M11 14h6"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 6l2.3 1.8M17.5 16.2l2.3 1.8M4.2 18l2.3-1.8M17.5 7.8 19.8 6M2.5 12h3M18.5 12h3"/>',
  shield: '<path d="M12 3 19 6v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  cursor: '<path d="M5.5 3.5 18 10l-5.6 1.8L10 17.5z"/><path d="M12.4 11.8 17 18.5"/>',
  bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 20 20"/>',
  signpost: '<path d="M12 3v18M5 5.5h11l2.5 2.5-2.5 2.5H5zM19 13H8l-2.5 2.5L8 18h11z"/>',
  home: '<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
  plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l5.5-3.5z"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
  cross: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.7 0-2.8 1-2.8 2.2 0 2.9 5.6 1.6 5.6 4.5 0 1.2-1.2 2.3-2.8 2.3-1.1 0-2.2-.6-2.7-1.6M12 6v1.5M12 16.5V18"/>',
};

/** Adds icons of one script, a name that already exists stops the script */
export function addIcons(shapes) {
  for (const [name, shape] of Object.entries(shapes)) {
    if (ICONS[name]) throw new Error(`The icon "${name}" exists already.`);
    ICONS[name] = shape;
  }
}

/** An icon at x, y with the given size, in the colour of the tone or of the card around it */
export function icon(name, x, y, size = ICON, tone = '') {
  const shape = ICONS[name];
  if (!shape) throw new Error(`Unknown icon "${name}". Known: ${Object.keys(ICONS).join(', ')}.`);
  const scale = size / 24;
  return `<g class="d-icon${tone ? ` d-icon-${tone}` : ''}" transform="translate(${x} ${y}) scale(${scale})">${shape}</g>`;
}

/** The arrowheads every figure uses, referenced as url(#<id>-head), -head-accent and -head-violet */
export function defs(id) {
  const head = (suffix, cls) =>
    `<marker id="${id}-${suffix}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" ` +
    `orient="auto-start-reverse"><path class="${cls}" d="M 0 1 L 9 5 L 0 9 z"/></marker>`;
  return `<defs>${head('head', 'd-head')}${head('head-accent', 'd-head d-head-accent')}${head('head-violet', 'd-head d-head-violet')}</defs>`;
}

/**
 * A tinted band that groups the cards of one place or one step. Level 1 is neutral, 2 blue,
 * 3 violet and 4 teal, so neighbouring zones stay apart in light and dark mode.
 */
export function band(x, y, w, h, level = 1) {
  return `<rect class="d-band d-band-${level}" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/>`;
}

/**
 * A card with a title and an optional subtitle. Without an icon the text is centred, with an icon
 * it starts after the icon. Accent draws the card with a blue border for what the figure is about,
 * tone violet marks a second kind of thing. Code sets the subtitle in the monospace font, detail
 * adds a third line in it. Dashed draws a card that is not there yet, such as a component that
 * loads on demand, as an outline without a shadow.
 */
export function tile(x, y, w, h, title, sub = '', { accent = false, code = false, icon: name = '', tone = '', detail = '', dashed = false } = {}) {
  const left = Boolean(name);
  const space = left ? w - ICON_SPACE + PADDING : w;
  fit(title, space, SIZE.title, { bold: true });
  if (sub) fit(sub, space, code ? SIZE.code : SIZE.sub, { mono: code });
  if (detail) fit(detail, space, SIZE.code, { mono: true });
  const lines = 1 + (sub ? 1 : 0) + (detail ? 1 : 0);
  if (h < 14 + lines * 15) throw new Error(`The card "${title}" with ${lines} lines needs at least ${14 + lines * 15} px of height, it has ${h} px.`);
  const kind = tone ? ` d-tile-${tone}` : accent ? ' d-tile-accent' : '';
  const parts = dashed
    ? [`<rect class="d-placeholder" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`]
    : [
        `<rect class="d-shadow" x="${x}" y="${y + 1.5}" width="${w}" height="${h}" rx="10"/>`,
        `<rect class="d-tile${kind}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`,
      ];
  if (left) parts.push(icon(name, x + PADDING, y + h / 2 - ICON / 2, ICON, tone || (accent ? 'accent' : '')));
  const tx = left ? x + ICON_SPACE : x + w / 2;
  const anchor = left ? 'start' : 'middle';
  const subClass = code ? 'd-code' : 'd-sub';
  const titleClass = `d-title${tone ? ` d-title-${tone}` : ''}`;
  if (detail) {
    // Three lines, the last one in the monospace font for an address or a name
    parts.push(`<text class="${titleClass}" x="${tx}" y="${y + h / 2 - 10}" text-anchor="${anchor}">${escape(title)}</text>`);
    parts.push(`<text class="${subClass}" x="${tx}" y="${y + h / 2 + 5}" text-anchor="${anchor}">${escape(sub)}</text>`);
    parts.push(`<text class="d-code" x="${tx}" y="${y + h / 2 + 20}" text-anchor="${anchor}">${escape(detail)}</text>`);
  } else if (sub) {
    parts.push(`<text class="${titleClass}" x="${tx}" y="${y + h / 2 - 3}" text-anchor="${anchor}">${escape(title)}</text>`);
    parts.push(`<text class="${subClass}" x="${tx}" y="${y + h / 2 + 13}" text-anchor="${anchor}">${escape(sub)}</text>`);
  } else {
    parts.push(`<text class="${titleClass}" x="${tx}" y="${y + h / 2 + 4.5}" text-anchor="${anchor}">${escape(title)}</text>`);
  }
  return parts.join('\n');
}

/**
 * A dashed outline with one muted line, for what does not happen or is not there yet, such as a
 * request the SPA does not send
 */
export function placeholder(x, y, w, h, text, { code = false } = {}) {
  fit(text, w, code ? SIZE.code : SIZE.sub, { mono: code });
  return [
    `<rect class="d-placeholder" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`,
    `<text class="${code ? 'd-code' : 'd-sub'}" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${escape(text)}</text>`,
  ].join('\n');
}

/** A flat strip across a band, for the base a layer runs on */
export function strip(x, y, w, h, text) {
  fit(text, w, SIZE.sub);
  return [
    `<rect class="d-strip" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`,
    `<text class="d-sub" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${escape(text)}</text>`,
  ].join('\n');
}

/** The name of a zone, layer or group in small capitals, tone blue, violet or teal */
export function label(x, y, text, anchor = 'start', { tone = '' } = {}) {
  const cls = `d-label${tone ? ` d-label-${tone}` : ''}`;
  return `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${escape(String(text).toUpperCase())}</text>`;
}

/** A short heading of a step or a row outside a card, in the weight of a card title */
export function heading(x, y, text, anchor = 'start') {
  return `<text class="d-title-small" x="${x}" y="${y}" text-anchor="${anchor}">${escape(text)}</text>`;
}

/** Muted metadata beside or under a label */
export function meta(x, y, text, anchor = 'start') {
  return `<text class="d-meta" x="${x}" y="${y}" text-anchor="${anchor}">${escape(text)}</text>`;
}

/** Plain secondary text, code sets it in the monospace font of the site */
export function note(x, y, text, anchor = 'start', { code = false } = {}) {
  return `<text class="${code ? 'd-code' : 'd-sub'}" x="${x}" y="${y}" text-anchor="${anchor}">${escape(text)}</text>`;
}

/** A free note that has to stay within the given width */
export function fitted(x, y, text, width, anchor = 'start', { code = false } = {}) {
  room(text, width, { mono: code });
  return note(x, y, text, anchor, { code });
}

/** One line of text from parts in prose and in code, such as an explanation that ends with a call */
export function mixed(x, y, parts, anchor = 'start') {
  const spans = parts.map(([text, code]) => (code ? `<tspan class="d-code">${escape(text)}</tspan>` : escape(text)));
  return `<text class="d-sub" x="${x}" y="${y}" text-anchor="${anchor}">${spans.join('')}</text>`;
}

/** Width of a line from mixed() */
export const mixedWidth = (parts) => parts.reduce((sum, [text, code]) => sum + measure(text, SIZE.sub, { mono: code }), 0);

/** A small rounded tag such as «neu» in the corner of a card or band */
export function tag(x, y, text, { tone = '' } = {}) {
  const w = tagWidth(text);
  return [
    `<rect class="d-tag${tone ? ` d-tag-${tone}` : ''}" x="${x}" y="${y}" width="${w}" height="18" rx="9"/>`,
    `<text class="d-tag-text${tone ? ` d-tag-text-${tone}` : ''}" x="${x + w / 2}" y="${y + 12.5}" text-anchor="middle">${escape(text)}</text>`,
  ].join('\n');
}

/** Width of a tag from tag() */
export const tagWidth = (text) => Math.ceil(measure(text, SIZE.sub, { bold: true })) + 14;

/** A round badge with a step number or a letter, its centre at x, y, accent fills it in blue */
export function badge(x, y, text, { accent = false } = {}) {
  return [
    `<circle class="d-badge${accent ? ' d-badge-accent' : ''}" cx="${x}" cy="${y}" r="10"/>`,
    `<text class="d-badge-text${accent ? ' d-badge-text-accent' : ''}" x="${x}" y="${y + 4}" text-anchor="middle">${escape(text)}</text>`,
  ].join('\n');
}

const pathOf = (points) => points.map(([px, py], i) => `${i === 0 ? 'M' : 'L'} ${px} ${py}`).join(' ');

/** A connecting line, accent in blue, tone violet or teal, dashed for a weaker or a later link */
export function line(points, { dashed = false, accent = false, tone = '' } = {}) {
  const classes = `d-line${accent ? ' d-line-accent' : ''}${tone ? ` d-line-${tone}` : ''}${dashed ? ' d-dashed' : ''}`;
  return `<path class="${classes}" d="${pathOf(points)}"/>`;
}

/** An arrow along the points, with its head at the last point, accent draws it in blue, tone violet in violet */
export function arrow(id, points, { accent = false, dashed = false, tone = '' } = {}) {
  const violet = tone === 'violet';
  if (tone && !violet) throw new Error(`Arrows know only the tone violet, not "${tone}".`);
  const classes = `d-arrow${accent ? ' d-arrow-accent' : ''}${violet ? ' d-arrow-violet' : ''}${dashed ? ' d-dashed' : ''}`;
  const head = violet ? '-violet' : accent ? '-accent' : '';
  return `<path class="${classes}" d="${pathOf(points)}" marker-end="url(#${id}-head${head})"/>`;
}

// Font settings of the text classes, for the check of the whole figure
const FONTS = {
  'd-title': { size: SIZE.title, bold: true },
  'd-title-small': { size: SIZE.small, bold: true },
  'd-sub': { size: SIZE.sub },
  'd-meta': { size: SIZE.sub },
  'd-code': { size: SIZE.code, mono: true },
  'd-label': { size: SIZE.label, bold: true, label: true },
  'd-tag-text': { size: SIZE.sub, bold: true },
  'd-badge-text': { size: SIZE.sub, bold: true },
};

/** Estimated width of a <text> element with its spans */
function textWidth(classes, inner) {
  const base = classes.map((name) => FONTS[name]).find(Boolean) ?? { size: SIZE.sub };
  let width = 0;
  for (const [, spanClass, spanText, plain] of inner.matchAll(/<tspan class="([^"]*)">([^<]*)<\/tspan>|([^<]+)/g)) {
    const text = unescape(spanText ?? plain ?? '');
    const font = spanClass ? { ...base, ...FONTS[spanClass], bold: spanClass === 'd-strong' || (FONTS[spanClass]?.bold ?? base.bold) } : base;
    width += font.label ? labelWidth(text) : measure(text, font.size, font);
  }
  return { width, size: base.size };
}

/** Stops the script when a card, band or text lies outside the figure */
function checkBounds(id, width, height, body) {
  const svg = body.join('\n');
  for (const match of svg.matchAll(/<rect class="(d-(?:tile|band|strip|tag|placeholder)[^"]*)" x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
    const [, cls, x, y, w, h] = match;
    if (Number(x) < 0 || Number(y) < 0 || Number(x) + Number(w) > width || Number(y) + Number(h) > height) {
      throw new Error(`${id}: a shape of class "${cls}" at ${x}, ${y} with ${w} × ${h} lies outside the figure of ${width} × ${height}.`);
    }
  }
  for (const match of svg.matchAll(/<text class="([^"]*)" x="([-\d.]+)" y="([-\d.]+)"(?: text-anchor="(start|middle|end)")?[^>]*>([\s\S]*?)<\/text>/g)) {
    const [, cls, x, y, anchor = 'start', inner] = match;
    const { width: w, size } = textWidth(cls.split(' '), inner);
    const left = anchor === 'start' ? Number(x) : anchor === 'middle' ? Number(x) - w / 2 : Number(x) - w;
    const text = unescape(inner.replace(/<[^>]+>/g, ''));
    if (left < MARGIN || left + w > width - MARGIN) {
      throw new Error(`${id}: "${text}" runs from about ${Math.floor(left)} to ${Math.ceil(left + w)} px, the figure is ${width} px wide.`);
    }
    if (Number(y) - size < 2 || Number(y) + 4 > height) {
      throw new Error(`${id}: "${text}" at the height ${y} lies outside the figure of ${height} px.`);
    }
  }
}

/** The whole figure on its ground, with its accessible title and description */
export function figure({ id, width, height, title, desc, body }) {
  checkBounds(id, width, height, body);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc">`,
    `<title id="${id}-title">${escape(title)}</title>`,
    `<desc id="${id}-desc">${escape(desc)}</desc>`,
    defs(id),
    `<rect class="d-ground" x="0" y="0" width="${width}" height="${height}" rx="14"/>`,
    ...body,
    '</svg>',
    '',
  ].join('\n');
}

/** Writes the SVG of a figure to site/src/assets/figures/<lang>/<name>.svg */
export function save(lang, name, svg) {
  const folder = join(ROOT, 'site', 'src', 'assets', 'figures', lang);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, `${name}.svg`), svg);
}
