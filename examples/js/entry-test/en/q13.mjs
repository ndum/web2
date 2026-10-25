const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
console.log(chf.format(20))
