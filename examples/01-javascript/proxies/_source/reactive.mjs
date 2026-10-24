let activeEffect = null
const effectsByKey = new Map()

function reactive(object) {
  return new Proxy(object, {
    get(target, key) {
      // Notes which effect reads which key
      if (activeEffect) {
        if (!effectsByKey.has(key)) effectsByKey.set(key, new Set())
        effectsByKey.get(key).add(activeEffect)
      }
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      // Runs every effect that read this key again
      for (const effect of effectsByKey.get(key) ?? []) effect()
      return true
    },
  })
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

const counts = reactive({ available: 49, total: 60 })
watchEffect(() => console.log(`${counts.available} [%von|of%] ${counts.total} [%Dingen sind da|things are in%]`))
counts.available = 48
counts.total = 62
