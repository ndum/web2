class Item {
  constructor(name, deposit) {
    this.name = name
    this.deposit = deposit
  }

  static fromLine(line) {
    const [name, deposit] = line.split(';')
    return new Item(name, Number(deposit))
  }
}

const item = Item.fromLine('[%Leiter|Ladder%];20')
console.log(item instanceof Item, item.name, item.deposit + 1)
