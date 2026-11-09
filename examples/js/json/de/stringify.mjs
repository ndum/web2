const tent = { id: 2, name: 'Zelt für vier Personen', deposit: 50, availableFrom: '2026-11-12' }

const text = JSON.stringify(tent)
console.log(text)
console.log(typeof text)

const back = JSON.parse(text)
console.log(back.deposit, back === tent)

// Das dritte Argument rückt den Text zum Lesen ein
console.log(JSON.stringify({ id: 6, name: 'Beamer' }, null, 2))
