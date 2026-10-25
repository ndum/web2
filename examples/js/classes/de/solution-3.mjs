const shop = {
  name: 'Lorraine Commons',
  greetLater() {
    // An arrow function keeps the this of greetLater, a function expression would lose it
    return () => `Willkommen bei ${this.name}`
  },
}

const greet = shop.greetLater()
console.log(greet())
