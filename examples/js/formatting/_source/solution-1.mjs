const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
const favorites = [
  { id: 3, name: '[%Raclette-Ofen|Raclette oven%]', deposit: 30 },
  { id: 6, name: '[%Beamer|Projector%]', deposit: 80 },
  { id: 8, name: '[%Schlafsack|Sleeping bag%]', deposit: 20 },
]

let total = 0
for (const item of favorites) {
  console.log(item.name, chf.format(item.deposit))
  total += item.deposit
}
console.log('[%Zusammen|Together%]', chf.format(total))
