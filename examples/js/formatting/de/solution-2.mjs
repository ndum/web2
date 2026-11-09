const today = '2026-10-31'
const onLoan = [
  { name: 'Zelt für vier Personen', availableFrom: '2026-11-12' },
  { name: 'Festbankgarnitur', availableFrom: '2026-11-03' },
  { name: 'Velo-Anhänger', availableFrom: '2026-11-12' },
]

// Rechnet wie loanDays aus Schritt 3
const daysBetween = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000
const relative = new Intl.RelativeTimeFormat('de-CH', { numeric: 'auto' })

for (const item of onLoan) {
  console.log(item.name, relative.format(daysBetween(today, item.availableFrom), 'day'))
}
