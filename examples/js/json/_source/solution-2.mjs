const reservation = { item: '[%Zelt|Tent%]', from: new Date('2026-11-02T00:00:00Z') }

const text = JSON.stringify(reservation)
const back = JSON.parse(text)
back.from = new Date(back.from)

console.log(text)
console.log(back.from.getUTCDate(), back.from instanceof Date)
