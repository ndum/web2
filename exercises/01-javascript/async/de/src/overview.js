import { CATALOG_URL, loadItems } from './load.js'

try {
  const items = await loadItems(CATALOG_URL)
  console.log(`${items.length} Dinge im Katalog`)
} catch (error) {
  console.log(error.message)
}
