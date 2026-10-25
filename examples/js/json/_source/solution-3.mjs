const settings = { pageSize: 20, favorites: new Set([3, 7]) }

console.log(JSON.stringify(settings))
console.log(JSON.stringify({ ...settings, favorites: [...settings.favorites] }))
