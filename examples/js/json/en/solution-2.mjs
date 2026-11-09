function readFavorites(text) {
  try {
    return JSON.parse(text)
  } catch (error) {
    console.log('Favorites unreadable:', error.name)
    return []
  }
}

console.log(readFavorites('[3,6,8]'))
console.log(readFavorites('[3,6,'))
