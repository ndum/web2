import { CATALOG_URL, loadItems, overviewLines } from './index.js'

try {
  const items = await loadItems(CATALOG_URL)
  console.log(overviewLines(items).join('\n'))
} catch (error) {
  console.log(error.message)
}
