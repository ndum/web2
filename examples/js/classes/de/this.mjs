const counter = {
  count: 0,
  increase() {
    this.count += 1
  },
}

counter.increase()
console.log(counter.count)

const increase = counter.increase
try {
  increase()
} catch (error) {
  console.log(error.name)
}

const bound = counter.increase.bind(counter)
bound()
console.log(counter.count)
