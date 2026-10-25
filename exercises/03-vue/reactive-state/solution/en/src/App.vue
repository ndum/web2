<script setup>
import { computed, ref } from 'vue'

import items from '../data/items.json'
import { formatDate } from './format.js'

const query = ref('')
const category = ref('')

const availableCount = computed(() => items.filter((item) => item.availableFrom === null).length)

// Every category once, in alphabetical order
const categories = computed(() =>
  [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'en')),
)

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter(
    (item) => item.name.toLowerCase().includes(text) && (category.value === '' || item.category === category.value),
  )
})

const hits = computed(() =>
  visibleItems.value.length === 1 ? '1 thing found' : `${visibleItems.value.length} things found`,
)
</script>

<template>
  <h1>Catalog</h1>
  <p class="summary">{{ availableCount }} of {{ items.length }} things are in</p>
  <div class="fields">
    <label for="search">Search</label>
    <input id="search" v-model="query" type="search">
    <label for="category">Category</label>
    <select id="category" v-model="category">
      <option value="">All categories</option>
      <option v-for="name in categories" :key="name">{{ name }}</option>
    </select>
  </div>
  <p class="hits">{{ hits }}</p>
  <ul v-if="visibleItems.length > 0" class="catalog">
    <li v-for="item in visibleItems" :key="item.id" :class="{ 'on-loan': item.availableFrom !== null }">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
      <span v-if="item.availableFrom === null" class="state">Available</span>
      <span v-else class="state">Available again from {{ formatDate(item.availableFrom) }}</span>
    </li>
  </ul>
  <p v-else class="empty">No things found.</p>
</template>
