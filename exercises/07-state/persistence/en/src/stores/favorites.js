import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  // For now the favorites only live in memory, a reload forgets them
  const ids = ref([])
  const count = computed(() => ids.value.length)

  function isFavorite(id) {
    return ids.value.includes(id)
  }

  function toggle(id) {
    ids.value = isFavorite(id) ? ids.value.filter((entry) => entry !== id) : [...ids.value, id]
  }

  return { ids, count, isFavorite, toggle }
})
