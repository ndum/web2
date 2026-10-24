import { availableNames, countAvailable, countByCategory, depositsOnLoan } from './catalog.js'
import { formatDeposit } from './format.js'

// The lines of the overview for the counter. The function only builds them, so tests can check them.
export function overviewLines(items) {
  const available = countAvailable(items)
  const lines = [
    `${available} von ${items.length} Dingen sind da.`,
    `Für die ${items.length - available} ausgeliehenen Dinge liegen ${formatDeposit(depositsOnLoan(items))} Pfand in der Kasse.`,
    '',
    'Dinge pro Kategorie',
  ]
  for (const [category, count] of Object.entries(countByCategory(items))) {
    lines.push(`  ${category} ${count}`)
  }
  lines.push('', 'Werkzeug, das da ist')
  for (const name of availableNames(items, 'Werkzeug')) {
    lines.push(`  ${name}`)
  }
  return lines
}
