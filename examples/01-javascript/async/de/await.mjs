function request(what, milliseconds) {
  return new Promise((resolve) => setTimeout(() => resolve(what), milliseconds))
}

async function oneAfterTheOther() {
  const items = await request('Dinge', 200)
  const members = await request('Mitglieder', 200)
  return [items, members]
}

async function atTheSameTime() {
  return Promise.all([request('Dinge', 200), request('Mitglieder', 200)])
}

// Rounded down to 200 milliseconds, the step of the timers. Timers never fire early, and a busy
// computer may start them up to 199 milliseconds late without changing the output
const elapsed = (start) => Math.floor((Date.now() - start) / 200) * 200

let start = Date.now()
console.log(await oneAfterTheOther(), elapsed(start))
start = Date.now()
console.log(await atTheSameTime(), elapsed(start))
