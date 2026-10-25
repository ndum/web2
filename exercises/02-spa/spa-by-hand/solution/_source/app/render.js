import { formatDate, formatDeposit } from './format.js'
import { escapeHtml } from './html.js'

function availability(item) {
  return item.availableFrom === null ? '[%Verfügbar|Available%]' : '[%Ausgeliehen|On loan%]'
}

// The catalog as a list, every entry links to the page of its thing
export function renderList(items) {
  const entries = items.map(
    (item) => `
      <li>
        <a href="#/items/${item.id}">${escapeHtml(item.name)}</a>
        <span class="category">${escapeHtml(item.category)}</span>
        <span class="state">${availability(item)}</span>
      </li>`,
  )
  return `<ul class="catalog">${entries.join('')}</ul>`
}

// The page of one thing
export function renderDetail(item) {
  const back = item.availableFrom === null ? availability(item) : `[%Wieder verfügbar ab|Available again from%] ${formatDate(item.availableFrom)}`
  return `
    <article>
      <h1>${escapeHtml(item.name)}</h1>
      <p>${escapeHtml(item.category)}, [%Pfand|deposit%] ${formatDeposit(item.deposit)}</p>
      <p>${back}</p>
      <a href="#/">[%Zum Katalog|Back to the catalog%]</a>
    </article>`
}

export function renderMessage(text) {
  return `<p class="message">${escapeHtml(text)}</p>`
}
