import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useLocalStorage } from '@/composables/useLocalStorage.js'

export const useFavoritesStore = defineStore('favorites', () => {
  // The ids of the favourite things, kept across reloads and the same in every tab
  const ids = useLocalStorage('lorraine-commons-favorites', [])
  const count = computed(() => ids.value.length)

  function isFavorite(id) {
    return ids.value.includes(id)
  }

  function toggle(id) {
    ids.value = isFavorite(id) ? ids.value.filter((entry) => entry !== id) : [...ids.value, id]
  }

  return { ids, count, isFavorite, toggle }
})
