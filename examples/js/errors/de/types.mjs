const items = [{ id: 1, name: 'Bohrmaschine', deposit: 20, availableFrom: null }]

// Jede Funktion enthält einen typischen Fehler, die Schleife ruft sie der Reihe nach auf
const attempts = [
  () => items[1].name,
  () => itemz.length,
  () => JSON.parse("{ 'name': 'Zelt' }"),
  () => (20).toFixed(200),
]

for (const attempt of attempts) {
  try {
    attempt()
  } catch (error) {
    console.log(error.name)
  }
}
