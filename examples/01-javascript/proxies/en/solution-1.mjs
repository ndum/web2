const basket = {
  items: [
    { name: 'Tent', deposit: 50 },
    { name: 'Sleeping bag', deposit: 20 },
  ],
  get total() {
    return this.items.reduce((sum, item) => sum + item.deposit, 0)
  },
}

console.log(basket.total)
basket.items.push({ name: 'Sleeping mat', deposit: 10 })
console.log(basket.total)
