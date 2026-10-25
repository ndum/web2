import { readFileSync } from 'node:fs'

// The export of the volunteers, read as text and turned into objects
const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })

function formatDeposit(amount) {
  return chf.format(amount)
}

function countAvailable(items) {
  let count = 0
  for (const item of items) {
    if (item.availableFrom === null) count += 1
  }
  return count
}

function findById(items, id) {
  for (const item of items) {
    if (item.id === id) return item
  }
  return undefined
}

console.log(`${countAvailable(items)} von ${items.length} Dingen sind da.`)

const projector = findById(items, 6)
console.log(`${projector.name}, Pfand ${formatDeposit(projector.deposit)}`)
