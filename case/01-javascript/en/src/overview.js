import { availableNames, countAvailable, countByCategory, depositsOnLoan } from './catalog.js'
import { formatDeposit } from './format.js'

// The lines of the overview for the counter. The function only builds them, so tests can check them.
export function overviewLines(items) {
  const available = countAvailable(items)
  const lines = [
    `${available} of ${items.length} things are in.`,
    `For the ${items.length - available} things on loan, the cash box holds ${formatDeposit(depositsOnLoan(items))} in deposits.`,
    '',
    'Things per category',
  ]
  for (const [category, count] of Object.entries(countByCategory(items))) {
    lines.push(`  ${category} ${count}`)
  }
  lines.push('', 'Tools that are in')
  for (const name of availableNames(items, 'Tools')) {
    lines.push(`  ${name}`)
  }
  return lines
}
