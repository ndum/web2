<script setup>
import { computed, reactive, ref, shallowRef } from 'vue'

import AppHeader from '@/components/AppHeader.vue'
import ItemCard from '@/components/ItemCard.vue'
import items from '../data/items.json'

// The catalog only changes as a whole, so Vue need not watch every field of every thing
const catalog = shallowRef(items)

// The ids of the favourite things
const favorites = ref([])

// Search text and category of the filter. The object stays the same, only its fields change.
const filter = reactive({ query: '', category: '' })

// Every category once, in alphabetical order
const categories = computed(() =>
  [...new Set(catalog.value.map((item) => item.category))].sort((a, b) => a.localeCompare(b, '[%de-CH|en%]')),
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

// Object.assign changes the fields, so the template and the list keep their connection
function resetFilter() {
  Object.assign(filter, { query: '', category: '' })
}

// shallowRef only notices a new value, so the catalog becomes a new array with a changed copy
function markReturned(id) {
  catalog.value = catalog.value.map((item) => (item.id === id ? { ...item, availableFrom: null } : item))
}
</script>

<template>
  <AppHeader :favorites="favorites" />
  <main>
    <h1>[%Katalog|Catalog%]</h1>
    <p class="summary">{{ availableCount }} [%von|of%] {{ catalog.length }} [%Dingen sind da|things are in%]</p>
    <div class="filters">
      <div class="search">
        <label for="search">[%Suchen|Search%]</label>
        <input id="search" v-model="filter.query" type="search">
      </div>
      <div class="filter">
        <label for="category">[%Kategorie|Category%]</label>
        <select id="category" v-model="filter.category">
          <option value="">[%Alle Kategorien|All categories%]</option>
          <option v-for="name in categories" :key="name">{{ name }}</option>
        </select>
      </div>
      <button type="button" class="reset" @click="resetFilter">[%Filter zurücksetzen|Reset the filter%]</button>
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
