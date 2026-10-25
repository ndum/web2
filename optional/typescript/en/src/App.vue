<script setup lang="ts">
import { computed, ref } from 'vue'

import items from '../data/items.json'
import { search } from './catalog'
import ItemCard from './components/ItemCard.vue'
import type { Item } from './types'

const catalog: Item[] = items
const query = ref('')
// Without the type argument the empty array would be never[]
const favorites = ref<number[]>([])
const hits = computed(() => search(catalog, query.value))

function toggleFavorite(id: number) {
  favorites.value = favorites.value.includes(id) ? favorites.value.filter((favorite) => favorite !== id) : [...favorites.value, id]
}
</script>

<template>
  <main>
    <h1>Catalog</h1>
    <label for="search">Search</label>
    <input id="search" v-model="query" type="search" />
    <p role="status">{{ hits.length }} things found, {{ favorites.length }} favorites</p>
    <ul class="grid">
      <li v-for="item in hits" :key="item.id">
        <ItemCard :item="item" :favorite="favorites.includes(item.id)" @toggle-favorite="toggleFavorite" />
      </li>
    </ul>
  </main>
</template>
