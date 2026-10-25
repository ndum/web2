// The lending software calls a thing differently. The adapter turns one of its things into an item
// as the app knows it, so no component has to know the other format.
export function toItem(thing) {
  return {
    id: thing.itemId,
    name: thing.title,
    category: thing.group,
    deposit: thing.depositCents / 100,
    availableFrom: thing.returnDate,
  }
}
