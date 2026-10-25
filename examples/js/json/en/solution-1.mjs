const text = '{"id": 6, "name": "Projector", "deposit": 80, "available": false}'

const item = JSON.parse(text)
console.log(item.name, item.deposit / 2, item.available ? 'free' : 'on loan')
