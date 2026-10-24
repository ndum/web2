<script setup>
import { computed, ref } from 'vue'

import ItemCard from '@/components/ItemCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import items from '../data/items.json'

const query = ref('')
const message = ref('')
// The ids of the favourite things, App owns them and the cards only show them
const favorites = ref([])

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
})

const favoriteCount = computed(() =>
  favorites.value.length === 1 ? '1 favorite' : `${favorites.value.length} favorites`,
)

function reserve(id) {
  const item = items.find((entry) => entry.id === id)
  message.value = `Reservation requested for ${item.name}.`
}

function toggleFavorite(id) {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((entry) => entry !== id)
    : [...favorites.value, id]
}
</script>

<template>
  <h1>Catalog</h1>
  <SearchBar v-model="query" />
  <p class="favorites">{{ favoriteCount }}</p>
  <p class="message" role="status">{{ message }}</p>
  <div class="grid">
    <ItemCard
      v-for="item in visibleItems"
      :id="item.id"
      :key="item.id"
      :name="item.name"
      :category="item.category"
      :available="item.availableFrom === null"
      :favorite="favorites.includes(item.id)"
      @reserve="reserve"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>
