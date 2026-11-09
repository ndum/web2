const today = '2026-10-31'
const onLoan = [
  { name: '[%Zelt für vier Personen|Tent for four%]', availableFrom: '2026-11-12' },
  { name: '[%Festbankgarnitur|Beer bench set%]', availableFrom: '2026-11-03' },
  { name: '[%Velo-Anhänger|Bike trailer%]', availableFrom: '2026-11-12' },
]

// [%Rechnet wie loanDays aus Schritt 3|Works like loanDays from step 3%]
const daysBetween = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000
const relative = new Intl.RelativeTimeFormat('[%de-CH|en-US%]', { numeric: 'auto' })

for (const item of onLoan) {
  console.log(item.name, relative.format(daysBetween(today, item.availableFrom), 'day'))
}
