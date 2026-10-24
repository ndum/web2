const names = ['Zelt', 'Äxte', 'Bohrmaschine']

const list = new Intl.ListFormat('de-CH', { style: 'long', type: 'conjunction' })
console.log(list.format(names))
console.log(new Intl.NumberFormat('de-CH').format(1234567.891))
