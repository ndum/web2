const desk = {
  inStock: 6,
  lend() {
    this.inStock -= 1
  },
}

desk.lend()
console.log(desk.inStock)

const lend = desk.lend
try {
  lend()
} catch (error) {
  console.log(error.name)
}

const bound = desk.lend.bind(desk)
bound()
const later = () => desk.lend()
later()
console.log(desk.inStock)
