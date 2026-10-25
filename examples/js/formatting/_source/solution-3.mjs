const names = ['[%Zelt|tent%]', '[%Äxte|Drill%]', '[%Bohrmaschine|axe%]']

const list = new Intl.ListFormat('[%de-CH|en-US%]', { style: 'long', type: 'conjunction' })
console.log(list.format(names))
console.log(new Intl.NumberFormat('de-CH').format(1234567.891))
