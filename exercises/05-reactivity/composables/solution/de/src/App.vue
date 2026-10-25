<script setup>
import { computed } from 'vue'

import { useFavorites } from '@/composables/useFavorites.js'
import { useLocalStorage } from '@/composables/useLocalStorage.js'
import { useSearch } from '@/composables/useSearch.js'
import items from '../data/items.json'

// Search text and favourites survive a reload
const query = useLocalStorage('lorraine-commons-search', '')
const { isFavorite, toggle, count } = useFavorites()
const { visibleItems, hits } = useSearch(items, query)

const favoriteLabel = computed(() => (count.value === 1 ? '1 Favorit' : `${count.value} Favoriten`))
const hitLabel = computed(() => (hits.value === 1 ? '1 Ding gefunden' : `${hits.value} Dinge gefunden`))
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <span class="favorites">{{ favoriteLabel }}</span>
  </header>
  <h1>Katalog</h1>
  <div class="search">
    <label for="search">Suchen</label>
    <input id="search" v-model="query" type="search">
  </div>
  <p class="hits">{{ hitLabel }}</p>
  <ul class="catalog">
    <li v-for="item in visibleItems" :key="item.id">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
      <button type="button" class="favorite" :aria-pressed="isFavorite(item.id)" @click="toggle(item.id)">Favorit</button>
    </li>
  </ul>
</template>

<style scoped>
.site {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
  margin: -1rem -1.5rem 1rem;
  padding: 0.75rem 1.5rem;
  background: #1f6b4f;
  color: #ffffff;
}
.brand {
  font-weight: 700;
}
.favorite[aria-pressed='true'] {
  font-weight: 700;
  color: #a3341f;
}
</style>
