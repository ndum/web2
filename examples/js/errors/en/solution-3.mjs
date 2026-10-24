const steps = []

function load() {
  try {
    steps.push('try')
    throw new Error('Server unreachable')
  } catch (error) {
    steps.push('catch')
    return 'fallback'
  } finally {
    steps.push('finally')
  }
}

console.log(load(), steps.join(' > '))
