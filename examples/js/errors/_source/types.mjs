const items = [{ id: 1, name: '[%Bohrmaschine|Drill%]', deposit: 20, availableFrom: null }]

// [%Jede Funktion enthält einen typischen Fehler, die Schleife ruft sie der Reihe nach auf|Every function holds a typical mistake, the loop calls them one after the other%]
const attempts = [
  () => items[1].name,
  () => itemz.length,
  () => JSON.parse("{ 'name': '[%Zelt|Tent%]' }"),
  () => (20).toFixed(200),
]

for (const attempt of attempts) {
  try {
    attempt()
  } catch (error) {
    console.log(error.name)
  }
}
