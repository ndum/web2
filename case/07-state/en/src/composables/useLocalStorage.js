import { onScopeDispose, ref, watch } from 'vue'

// A ref whose value survives a reload, stored as JSON under the key. When another tab of the app
// changes the entry, the ref follows.
export function useLocalStorage(key, initialValue) {
  const value = ref(read(key, initialValue))
  watch(value, (now) => localStorage.setItem(key, JSON.stringify(now)), { deep: true })

  // The browser fires storage only in the other tabs, key is null when a tab cleared everything
  function follow(event) {
    if (event.key === key || event.key === null) value.value = read(key, initialValue)
  }
  window.addEventListener('storage', follow)
  onScopeDispose(() => window.removeEventListener('storage', follow))

  return value
}

// A damaged entry or a value of another type does not count, then the initial value applies
function read(key, initialValue) {
  try {
    const stored = localStorage.getItem(key)
    const value = stored === null ? initialValue : JSON.parse(stored)
    const fits = Array.isArray(initialValue) ? Array.isArray(value) : typeof value === typeof initialValue
    return fits ? value : initialValue
  } catch {
    return initialValue
  }
}
