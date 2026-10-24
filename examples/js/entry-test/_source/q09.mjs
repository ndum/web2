const shop = {
  name: 'Lorraine Commons',
  getName() {
    return this.name
  },
}

const getName = shop.getName
try {
  console.log(getName())
} catch (error) {
  console.log(error.name)
}
