let activeEffect = null
// Every reactive object gets its own map from keys to effects
const effectsByTarget = new WeakMap()

function track(target, key) {
  if (!activeEffect) return
  if (!effectsByTarget.has(target)) effectsByTarget.set(target, new Map())
  const effectsByKey = effectsByTarget.get(target)
  if (!effectsByKey.has(key)) effectsByKey.set(key, new Set())
  effectsByKey.get(key).add(activeEffect)
}

function trigger(target, key) {
  for (const effect of effectsByTarget.get(target)?.get(key) ?? []) effect()
}

function reactive(object) {
  return new Proxy(object, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
      return true
    },
  })
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

const drill = reactive({ name: '[%Bohrmaschine|Drill%]', available: true })
const tent = reactive({ name: '[%Zelt|Tent%]', available: true })
watchEffect(() => console.log(drill.name, drill.available))
tent.available = false
drill.available = false
