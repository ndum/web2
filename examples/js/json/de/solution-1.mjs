const text = '{"id": 7, "name": "Beamer", "deposit": 80, "available": false}'

const item = JSON.parse(text)
console.log(item.name, item.deposit / 2, item.available ? 'frei' : 'ausgeliehen')
