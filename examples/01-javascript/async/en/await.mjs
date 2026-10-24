function request(what, milliseconds) {
  return new Promise((resolve) => setTimeout(() => resolve(what), milliseconds))
}

async function oneAfterTheOther() {
  const items = await request('things', 200)
  const members = await request('members', 200)
  return [items, members]
}

async function atTheSameTime() {
  return Promise.all([request('things', 200), request('members', 200)])
}

// Rounded down to 100 milliseconds, timers never fire early
const elapsed = (start) => Math.floor((Date.now() - start) / 100) * 100

let start = Date.now()
console.log(await oneAfterTheOther(), elapsed(start))
start = Date.now()
console.log(await atTheSameTime(), elapsed(start))
