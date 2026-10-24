import { escapeHtml } from './html.js'

// The catalog as a list, every entry links to the page of its thing
export function renderList(items) {
  return '<p>Hier erscheint der Katalog.</p>'
}

// The page of one thing
export function renderDetail(item) {
  return '<p>Hier erscheint die Seite eines Dings.</p>'
}

export function renderMessage(text) {
  return `<p class="message">${escapeHtml(text)}</p>`
}
