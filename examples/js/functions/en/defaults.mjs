function formatDeposit(amount, currency = 'CHF') {
  return `${currency} ${amount.toFixed(2)}`
}

const days = (from, to) => (to - from) / (1000 * 60 * 60 * 24)

console.log(formatDeposit(20))
console.log(formatDeposit(12.5, 'EUR'))
console.log(days(new Date('2026-11-02'), new Date('2026-11-05')))
