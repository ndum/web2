class Item {
  constructor(id, name, deposit, availableFrom = null) {
    this.id = id
    this.name = name
    this.deposit = deposit
    this.availableFrom = availableFrom
  }

  // [%isIn aus Schritt 3 wird eine Methode, die ihr Ding über this kennt|isIn from step 3 becomes a method that knows its thing through this%]
  isIn() {
    return this.availableFrom === null
  }

  // [%Gehört zur Klasse, weil es noch kein Ding gibt, das man fragen könnte|Belongs to the class, because there is no thing yet to ask%]
  static fromLine(line) {
    const [id, name, deposit] = line.split(';')
    return new Item(Number(id), name, Number(deposit))
  }
}

const tent = new Item(2, '[%Zelt für vier Personen|Tent for four%]', 50, '2026-11-12')
const ladder = Item.fromLine('7;[%Leiter|Ladder%];20')

console.log(tent.name, tent.isIn())
console.log(ladder.name, typeof ladder.deposit, ladder.isIn())
console.log(ladder instanceof Item, typeof Item)
