const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
console.log(chf.format(20), chf.format(150))

// About 300 members pay CHF 40 a year each
console.log(chf.format(300 * 40))

// 6 of 9 things are in
const percent = new Intl.NumberFormat('en-US', { style: 'percent' })
console.log(percent.format(6 / 9))
