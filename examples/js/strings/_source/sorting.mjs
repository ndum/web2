const names = ['[%Zelt|tent%]', '[%Äxte|Drill%]', '[%Bohrmaschine|axe%]']

console.log([...names].sort())
console.log([...names].sort((a, b) => a.localeCompare(b, '[%de-CH|en-US%]')))
