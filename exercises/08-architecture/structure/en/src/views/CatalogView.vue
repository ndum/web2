<script setup>
import { onMounted, ref } from 'vue'

import ItemCard from '@/components/ItemCard.vue'
import { useFavoritesStore } from '@/stores/favorites.js'

const favorites = useFavoritesStore()
const items = ref([])
const status = ref('loading')

onMounted(async () => {
  try {
    const response = await fetch('/api/en/items')
    if (!response.ok) throw new Error(`Status ${response.status}`)
    items.value = await response.json()
    status.value = 'ready'
  } catch {
    status.value = 'error'
  }
})
</script>

<template>
  <h1>Catalog</h1>
  <p v-if="status === 'loading'">Loading the catalog …</p>
  <p v-else-if="status === 'error'" class="error">The catalog cannot be loaded.</p>
  <ul v-else class="catalog">
    <ItemCard
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :name="item.name"
      :category="item.category"
      :favorite="favorites.isFavorite(item.id)"
      @toggle-favorite="favorites.toggle"
    />
  </ul>
</template>
