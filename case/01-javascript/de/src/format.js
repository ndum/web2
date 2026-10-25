const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })

export function formatDeposit(amount) {
  return chf.format(amount)
}
