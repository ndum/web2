const ids = [9, 10, 2, 12]
console.log(ids.toSorted().join(', '))
console.log(ids.toSorted((a, b) => a - b).join(', '))
console.log(ids.join(', '))

const names = ['Velo-Anhänger', 'Rasenmäher', 'Zelt für vier Personen', 'Schleifmaschine']
names.sort((a, b) => a.localeCompare(b, 'de-CH'))
console.log(names.join(', '))
