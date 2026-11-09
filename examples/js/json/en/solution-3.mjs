const settings = { member: 'M-117', favorites: new Set([3, 6, 8]) }

console.log(JSON.stringify(settings))

// JSON has no Set, so it becomes an array before storing
const text = JSON.stringify({ ...settings, favorites: [...settings.favorites] })
console.log(text)

const back = JSON.parse(text)
back.favorites = new Set(back.favorites)
console.log(back.favorites.has(6))
