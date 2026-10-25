<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { things } from './things.js'

const route = useRoute()
const router = useRouter()

// The search text lives in the address, the field reads it from there and writes it back
const query = computed({
  get: () => route.query.q ?? '',
  // replace instead of push, so the back button skips the single keystrokes
  set: (text) => router.replace({ query: { ...route.query, q: text || undefined } }),
})

const visibleThings = computed(() => {
  const text = query.value.trim().toLowerCase()
  return things.filter((thing) => thing.name.toLowerCase().includes(text))
})
</script>

<template>
  <h1>Catalog</h1>
  <label for="search">Search</label>
  <input id="search" v-model="query" type="search">
  <ul>
    <li v-for="thing in visibleThings" :key="thing.id">{{ thing.name }}</li>
  </ul>
  <RouterLink :to="{ name: 'catalog', query: { q: 'saw' } }">All saws</RouterLink>
</template>
