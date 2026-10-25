import { ref } from 'vue'

// The ids of the favorites, shared by the catalog and the list of favorites
export const favoriteIds = ref([])

export function toggleFavorite(id) {
  favoriteIds.value = favoriteIds.value.includes(id) ? favoriteIds.value.filter((entry) => entry !== id) : [...favoriteIds.value, id]
}

export function removeFavorite(id) {
  favoriteIds.value = favoriteIds.value.filter((entry) => entry !== id)
}
