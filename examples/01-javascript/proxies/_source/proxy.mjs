const item = { name: '[%Zelt|Tent%]', availableFrom: null }

const watched = new Proxy(item, {
  get(target, key) {
    console.log(`[%gelesen|read%] ${String(key)}`)
    return target[key]
  },
  set(target, key, value) {
    console.log(`[%geschrieben|written%] ${String(key)} = ${value}`)
    target[key] = value
    return true
  },
})

watched.availableFrom = '2026-11-14'
console.log(watched.name)
console.log(item.availableFrom)
