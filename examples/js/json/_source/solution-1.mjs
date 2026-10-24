const text = '{"id": 7, "name": "[%Beamer|Projector%]", "deposit": 80, "available": false}'

const item = JSON.parse(text)
console.log(item.name, item.deposit / 2, item.available ? '[%frei|free%]' : '[%ausgeliehen|on loan%]')
