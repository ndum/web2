import * as catalog from './catalog.mjs'
import { items } from './items.mjs'

console.log(Object.keys(catalog))
console.log(catalog.findById(items, 3).name)
