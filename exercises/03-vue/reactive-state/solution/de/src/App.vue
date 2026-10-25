<script setup>
import { computed, ref } from 'vue'

import items from '../data/items.json'
import { formatDate } from './format.js'

const query = ref('')
const category = ref('')

const availableCount = computed(() => items.filter((item) => item.availableFrom === null).length)

// Every category once, in alphabetical order
const categories = computed(() =>
  [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'de-CH')),
)

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter(
    (item) => item.name.toLowerCase().includes(text) && (category.value === '' || item.category === category.value),
  )
})

const hits = computed(() =>
  visibleItems.value.length === 1 ? '1 Ding gefunden' : `${visibleItems.value.length} Dinge gefunden`,
)
</script>

<template>
  <h1>Katalog</h1>
  <p class="summary">{{ availableCount }} von {{ items.length }} Dingen sind da</p>
  <div class="fields">
    <label for="search">Suchen</label>
    <input id="search" v-model="query" type="search">
    <label for="category">Kategorie</label>
    <select id="category" v-model="category">
      <option value="">Alle Kategorien</option>
      <option v-for="name in categories" :key="name">{{ name }}</option>
    </select>
  </div>
  <p class="hits">{{ hits }}</p>
  <ul v-if="visibleItems.length > 0" class="catalog">
    <li v-for="item in visibleItems" :key="item.id" :class="{ 'on-loan': item.availableFrom !== null }">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
      <span v-if="item.availableFrom === null" class="state">Verfügbar</span>
      <span v-else class="state">Wieder verfügbar ab {{ formatDate(item.availableFrom) }}</span>
    </li>
  </ul>
  <p v-else class="empty">Keine Dinge gefunden.</p>
</template>
