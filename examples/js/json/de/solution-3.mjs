const settings = { member: 'M-117', favorites: new Set([3, 6, 8]) }

console.log(JSON.stringify(settings))

// JSON kennt kein Set, darum wird es vor dem Speichern zum Array
const text = JSON.stringify({ ...settings, favorites: [...settings.favorites] })
console.log(text)

const back = JSON.parse(text)
back.favorites = new Set(back.favorites)
console.log(back.favorites.has(6))
