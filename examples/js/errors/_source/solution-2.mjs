let loading = false
const steps = []

function loadList() {
  loading = true
  try {
    steps.push('try')
    throw new Error('[%Die Liste ist nicht erreichbar|The list cannot be reached%]')
  } catch (error) {
    steps.push('catch')
    return []
  } finally {
    // [%Läuft auch nach dem return im catch-Block, so verschwindet die Ladeanzeige immer|Runs even after the return in the catch block, so the loading indicator always goes away%]
    loading = false
    steps.push('finally')
  }
}

const list = loadList()
console.log(list.length, loading)
console.log(steps.join(' > '))
