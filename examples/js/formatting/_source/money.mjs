const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
console.log(chf.format(20), chf.format(150))

// [%Rund 300 Mitglieder zahlen je CHF 40 im Jahr|About 300 members pay CHF 40 a year each%]
console.log(chf.format(300 * 40))

// [%6 von 9 Dingen sind da|6 of 9 things are in%]
const percent = new Intl.NumberFormat('[%de-CH|en-US%]', { style: 'percent' })
console.log(percent.format(6 / 9))
