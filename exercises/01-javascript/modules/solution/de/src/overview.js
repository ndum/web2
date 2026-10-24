import { readFileSync } from 'node:fs'

import { countAvailable, findById, formatDeposit } from './index.js'

// The export of the volunteers, read as text and turned into objects
const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

console.log(`${countAvailable(items)} von ${items.length} Dingen sind da.`)

const projector = findById(items, 6)
console.log(`${projector.name}, Pfand ${formatDeposit(projector.deposit)}`)
