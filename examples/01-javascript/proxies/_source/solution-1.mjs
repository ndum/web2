const basket = {
  items: [
    { name: '[%Zelt|Tent%]', deposit: 50 },
    { name: '[%Schlafsack|Sleeping bag%]', deposit: 20 },
  ],
  get total() {
    return this.items.reduce((sum, item) => sum + item.deposit, 0)
  },
}

console.log(basket.total)
basket.items.push({ name: '[%Isomatte|Sleeping mat%]', deposit: 10 })
console.log(basket.total)
