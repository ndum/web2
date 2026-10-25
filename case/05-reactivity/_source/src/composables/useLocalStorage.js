import { ref, watch } from 'vue'

// A ref whose value survives a reload, stored as JSON under the key
export function useLocalStorage(key, initialValue) {
  const value = ref(read(key, initialValue))
  watch(value, (now) => localStorage.setItem(key, JSON.stringify(now)), { deep: true })
  return value
}

// A damaged entry or a value of another type does not count, then the initial value applies
function read(key, initialValue) {
  try {
    const stored = localStorage.getItem(key)
    const value = stored === null ? initialValue : JSON.parse(stored)
    return typeof value === typeof initialValue ? value : initialValue
  } catch {
    return initialValue
  }
}
