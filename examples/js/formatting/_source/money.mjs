const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
console.log(chf.format(20))
console.log(chf.format(1234.5))

const percent = new Intl.NumberFormat('[%de-CH|en-US%]', { style: 'percent' })
console.log(percent.format(0.35))
