import items from '../data/items.json'

// A stand-in for the server of the association. Like a real server it answers sometimes
// quickly and sometimes slowly, so a later answer can overtake an earlier one.
export function checkAvailability(id) {
  const item = items.find((entry) => entry.id === id)
  const delay = 200 + Math.random() * 1000
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, available: item.availableFrom === null }), delay)
  })
}
