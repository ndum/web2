class Item {
  constructor(id, name, deposit, availableFrom = null) {
    this.id = id
    this.name = name
    this.deposit = deposit
    this.availableFrom = availableFrom
  }

  // isIn aus Schritt 3 wird eine Methode, die ihr Ding über this kennt
  isIn() {
    return this.availableFrom === null
  }

  // Gehört zur Klasse, weil es noch kein Ding gibt, das man fragen könnte
  static fromLine(line) {
    const [id, name, deposit] = line.split(';')
    return new Item(Number(id), name, Number(deposit))
  }
}

const tent = new Item(2, 'Zelt für vier Personen', 50, '2026-11-12')
const ladder = Item.fromLine('7;Leiter;20')

console.log(tent.name, tent.isIn())
console.log(ladder.name, typeof ladder.deposit, ladder.isIn())
console.log(ladder instanceof Item, typeof Item)
