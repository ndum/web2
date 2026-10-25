import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const KEY = 'lorraine-commons-favorites'

// The storage only holds text. A damaged entry counts as no favorites.
function read() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref(read())
  const count = computed(() => ids.value.length)
  // Every change goes into the storage, the next start reads it back
  watch(ids, (value) => localStorage.setItem(KEY, JSON.stringify(value)), { deep: true })
  function isFavorite(id) {
    return ids.value.includes(id)
  }

  function toggle(id) {
    ids.value = isFavorite(id) ? ids.value.filter((entry) => entry !== id) : [...ids.value, id]
  }

  return { ids, count, isFavorite, toggle }
})
