<script setup>
import { computed, reactive, ref } from 'vue'

import AppHeader from '@/components/AppHeader.vue'
import ItemCard from '@/components/ItemCard.vue'
import items from '../data/items.json'

// The whole catalog of the association
const catalog = ref(items)

// The ids of the favourite things
const favorites = ref([])

// Search text and category of the filter
let filter = reactive({ query: '', category: '' })

// Every category once, in alphabetical order
const categories = computed(() =>
  [...new Set(catalog.value.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'en')),
)

const visibleItems = computed(() => {
  const text = filter.query.trim().toLowerCase()
  return catalog.value.filter(
    (item) => item.name.toLowerCase().includes(text) && (filter.category === '' || item.category === filter.category),
  )
})

const availableCount = computed(() => catalog.value.filter((item) => item.availableFrom === null).length)

function toggleFavorite(id) {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((entry) => entry !== id)
    : [...favorites.value, id]
}

// Back to an empty filter
function resetFilter() {
  filter = reactive({ query: '', category: '' })
}

// A thing that comes back is available again
function markReturned(id) {
  catalog.value.find((item) => item.id === id).availableFrom = null
}
</script>

<template>
  <AppHeader :favorites="favorites" />
  <main>
    <h1>Catalog</h1>
    <p class="summary">{{ availableCount }} of {{ catalog.length }} things are in</p>
    <div class="filters">
      <div class="search">
        <label for="search">Search</label>
        <input id="search" v-model="filter.query" type="search">
      </div>
      <div class="filter">
        <label for="category">Category</label>
        <select id="category" v-model="filter.category">
          <option value="">All categories</option>
          <option v-for="name in categories" :key="name">{{ name }}</option>
        </select>
      </div>
      <button type="button" class="reset" @click="resetFilter">Reset the filter</button>
    </div>
    <div class="grid">
      <ItemCard
        v-for="item in visibleItems"
        :id="item.id"
        :key="item.id"
        :name="item.name"
        :category="item.category"
        :available="item.availableFrom === null"
        :favorite="favorites.includes(item.id)"
        @toggle-favorite="toggleFavorite"
        @returned="markReturned"
      />
    </div>
  </main>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
