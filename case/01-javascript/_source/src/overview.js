import { availableNames, countAvailable, countByCategory, depositsOnLoan } from './catalog.js'
import { formatDeposit } from './format.js'

// The lines of the overview for the counter. The function only builds them, so tests can check them.
export function overviewLines(items) {
  const available = countAvailable(items)
  const lines = [
    `${available} [%von|of%] ${items.length} [%Dingen sind da.|things are in.%]`,
    `[%Für die|For the%] ${items.length - available} [%ausgeliehenen Dinge liegen|things on loan, the cash box holds%] ${formatDeposit(depositsOnLoan(items))} [%Pfand in der Kasse.|in deposits.%]`,
    '',
    '[%Dinge pro Kategorie|Things per category%]',
  ]
  for (const [category, count] of Object.entries(countByCategory(items))) {
    lines.push(`  ${category} ${count}`)
  }
  lines.push('', '[%Werkzeug, das da ist|Tools that are in%]')
  for (const name of availableNames(items, '[%Werkzeug|Tools%]')) {
    lines.push(`  ${name}`)
  }
  return lines
}
