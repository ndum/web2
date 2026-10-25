import { computed, toValue } from 'vue'

// items and query may be refs, getters or plain values, toValue reads all three
export function useSearch(items, query) {
  const visibleItems = computed(() => {
    const text = toValue(query).trim().toLowerCase()
    return toValue(items).filter((item) => item.name.toLowerCase().includes(text))
  })
  const hits = computed(() => visibleItems.value.length)
  // An object of refs, so destructuring keeps the connection
  return { visibleItems, hits }
}
