import { computed } from 'vue'

import { useLocalStorage } from './useLocalStorage.js'

// The ids of the favourite things, remembered across reloads
export function useFavorites() {
  const favorites = useLocalStorage('example-favorites', [])

  const isFavorite = (id) => favorites.value.includes(id)

  function toggle(id) {
    favorites.value = isFavorite(id) ? favorites.value.filter((entry) => entry !== id) : [...favorites.value, id]
  }

  const count = computed(() => favorites.value.length)
  return { favorites, isFavorite, toggle, count }
}
