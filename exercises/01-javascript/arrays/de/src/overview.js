import { readFileSync } from 'node:fs'

import { availableNames, countByCategory } from './catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

console.log('Dinge pro Kategorie')
for (const [category, count] of Object.entries(countByCategory(items))) {
  console.log(`  ${category} ${count}`)
}

console.log('Werkzeug, das da ist')
for (const name of availableNames(items, 'Werkzeug')) {
  console.log(`  ${name}`)
}
