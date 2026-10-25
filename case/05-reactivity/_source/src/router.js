// Reads the part of the address after the #, for example #/items/6, and returns the route
export function parseRoute(hash) {
  if (hash === '' || hash === '#/') return { name: 'catalog' }
  const match = /^#\/items\/(\d+)$/.exec(hash)
  if (match) return { name: 'item', id: Number(match[1]) }
  return { name: 'notFound' }
}
