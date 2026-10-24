import { countAvailable, findById } from './catalog.mjs'
import { formatDeposit } from './format.mjs'
import { items } from './items.mjs'

console.log(`${countAvailable(items)} of ${items.length} things are in.`)

const projector = findById(items, 6)
console.log(`${projector.name}, deposit ${formatDeposit(projector.deposit)}`)
