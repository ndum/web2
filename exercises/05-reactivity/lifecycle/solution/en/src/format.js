const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })

// An amount in francs such as CHF 20.00
export function formatDeposit(amount) {
  return chf.format(amount)
}
