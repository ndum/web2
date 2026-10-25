<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import items from '../../data/items.json'

const route = useRoute()
const router = useRouter()

// Search text and sort live in the query, so a link shows the same list.
// replace instead of push, the back button should not step through every keystroke.
const query = computed({
  get: () => route.query.q ?? '',
  set: (text) => router.replace({ query: { ...route.query, q: text || undefined } }),
})

const sort = computed({
  get: () => route.query.sort ?? '',
  set: (value) => router.replace({ query: { ...route.query, sort: value || undefined } }),
})

const byName = (a, b) => a.name.localeCompare(b.name, 'de-CH')
const byDeposit = (a, b) => a.deposit - b.deposit || byName(a, b)

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  const found = items.filter((item) => item.name.toLowerCase().includes(text))
  return found.toSorted(sort.value === 'deposit' ? byDeposit : byName)
})
</script>

<template>
  <h1>Katalog</h1>
  <div class="filters">
    <div class="search">
      <label for="search">Suchen</label>
      <input id="search" v-model="query" type="search">
    </div>
    <div class="filter">
      <label for="sort">Sortieren nach</label>
      <select id="sort" v-model="sort">
        <option value="">Name</option>
        <option value="deposit">Pfand</option>
      </select>
    </div>
  </div>
  <ul class="catalog">
    <li v-for="item in visibleItems" :key="item.id">
      <RouterLink :to="{ name: 'item', params: { id: item.id } }" class="name">{{ item.name }}</RouterLink>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>
