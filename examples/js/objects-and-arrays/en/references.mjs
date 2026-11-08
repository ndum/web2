const drill = { id: 1, name: 'Drill', deposit: 20, availableFrom: null }
const items = [drill]

const sameDrill = items[0]
sameDrill.deposit = 25
console.log(drill.deposit, items[0].deposit)

const copy = { ...drill, deposit: 20 }
console.log(copy.deposit, drill.deposit)
console.log(copy === drill, sameDrill === drill)
