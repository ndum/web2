const reservation = { itemId: 6, member: 'M-117', from: new Date('2026-11-07'), days: 4, note: undefined }

const text = JSON.stringify(reservation)
console.log(text)

const back = JSON.parse(text)
console.log(Object.keys(back).join(', '))
console.log(typeof back.from)

// JSON kennt kein Date, darum macht new Date aus dem Text wieder eines
back.from = new Date(back.from)
console.log(back.from.getUTCDay(), back.from instanceof Date)
