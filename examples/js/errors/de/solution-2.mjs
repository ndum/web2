let loading = false
const steps = []

function loadList() {
  loading = true
  try {
    steps.push('try')
    throw new Error('Die Liste ist nicht erreichbar')
  } catch (error) {
    steps.push('catch')
    return []
  } finally {
    // Läuft auch nach dem return im catch-Block, so verschwindet die Ladeanzeige immer
    loading = false
    steps.push('finally')
  }
}

const list = loadList()
console.log(list.length, loading)
console.log(steps.join(' > '))
