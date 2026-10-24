const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })

export function formatDeposit(amount) {
  return chf.format(amount)
}

// A date without a time such as 2026-11-12, formatted in UTC so the day is right everywhere
export function formatDate(date) {
  return new Date(date).toLocaleDateString('de-CH', { timeZone: 'UTC' })
}
