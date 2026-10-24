import { countAvailable, findById } from './catalog.mjs'
import { formatDeposit } from './format.mjs'
import { items } from './items.mjs'

console.log(`${countAvailable(items)} von ${items.length} Dingen sind da.`)

const projector = findById(items, 6)
console.log(`${projector.name}, Pfand ${formatDeposit(projector.deposit)}`)
