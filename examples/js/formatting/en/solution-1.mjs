const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
const deposits = [20, 50, 12.5]

for (const deposit of deposits) console.log(chf.format(deposit))
