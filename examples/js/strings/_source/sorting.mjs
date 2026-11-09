const ids = [9, 10, 2, 12]
console.log(ids.toSorted().join(', '))
console.log(ids.toSorted((a, b) => a - b).join(', '))
console.log(ids.join(', '))

const names = ['[%Velo-Anhänger|Bike trailer%]', '[%Rasenmäher|Lawn mower%]', '[%Zelt für vier Personen|Tent for four%]', '[%Schleifmaschine|Sander%]']
names.sort((a, b) => a.localeCompare(b, '[%de-CH|en-US%]'))
console.log(names.join(', '))
