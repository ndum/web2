const favorites = [3, 6, 8]

const next = [...favorites]
next.splice(next.indexOf(6), 1)

console.log(favorites, next)
console.log(favorites.length, next.length)
