import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// A setup store: refs become state, computed values getters and functions actions
export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref([])
  const count = computed(() => ids.value.length)

  function isFavorite(id) {
    return ids.value.includes(id)
  }

  function toggle(id) {
    ids.value = isFavorite(id) ? ids.value.filter((entry) => entry !== id) : [...ids.value, id]
  }

  // A setup store returns all of its state, otherwise Pinia and the devtools miss it
  return { ids, count, isFavorite, toggle }
})
