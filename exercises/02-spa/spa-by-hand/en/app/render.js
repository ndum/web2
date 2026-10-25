import { escapeHtml } from './html.js'

// The catalog as a list, every entry links to the page of its thing
export function renderList(items) {
  return '<p>The catalog will appear here.</p>'
}

// The page of one thing
export function renderDetail(item) {
  return '<p>The page of a thing will appear here.</p>'
}

export function renderMessage(text) {
  return `<p class="message">${escapeHtml(text)}</p>`
}
