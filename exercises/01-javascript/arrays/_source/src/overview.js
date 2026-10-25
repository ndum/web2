import { readFileSync } from 'node:fs'

import { availableNames, countByCategory } from './catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

console.log('[%Dinge pro Kategorie|Things per category%]')
for (const [category, count] of Object.entries(countByCategory(items))) {
  console.log(`  ${category} ${count}`)
}

console.log('[%Werkzeug, das da ist|Tools that are in%]')
for (const name of availableNames(items, '[%Werkzeug|Tools%]')) {
  console.log(`  ${name}`)
}
