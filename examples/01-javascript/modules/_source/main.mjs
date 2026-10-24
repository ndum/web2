import { countAvailable, findById } from './catalog.mjs'
import { formatDeposit } from './format.mjs'
import { items } from './items.mjs'

console.log(`${countAvailable(items)} [%von|of%] ${items.length} [%Dingen sind da.|things are in.%]`)

const projector = findById(items, 6)
console.log(`${projector.name}, [%Pfand|deposit%] ${formatDeposit(projector.deposit)}`)
