const basket = {
  items: [
    { name: 'Zelt', deposit: 50 },
    { name: 'Schlafsack', deposit: 20 },
  ],
  get total() {
    return this.items.reduce((sum, item) => sum + item.deposit, 0)
  },
}

console.log(basket.total)
basket.items.push({ name: 'Isomatte', deposit: 10 })
console.log(basket.total)
