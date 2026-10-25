<script setup>
import { computed, onWatcherCleanup, ref, watch } from 'vue'

import { checkAvailability } from '@/availability.js'
import items from '../data/items.json'

const STORAGE_KEY = 'lorraine-commons-search'

// The search text of the last visit, or an empty field
const query = ref(localStorage.getItem(STORAGE_KEY) ?? '')

// localStorage lies outside the component, so a watcher writes into it
watch(query, (text) => {
  localStorage.setItem(STORAGE_KEY, text)
})

// The text the list filters by, it follows the field after a pause of 300 milliseconds
const settledQuery = ref(query.value)

watch(query, (text) => {
  const timer = setTimeout(() => {
    settledQuery.value = text
  }, 300)
  // The next keystroke clears the timer of this one
  onWatcherCleanup(() => clearTimeout(timer))
})

const visibleItems = computed(() => {
  const text = settledQuery.value.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
})

// The thing whose availability the server checks, 0 before the first choice
const selectedId = ref(0)
const availability = ref('')

watch(selectedId, async (id) => {
  // Becomes true as soon as another thing is chosen, then this answer no longer counts
  let outdated = false
  onWatcherCleanup(() => {
    outdated = true
  })
  availability.value = 'Asking the server …'
  const answer = await checkAvailability(id)
  if (outdated) return
  const item = items.find((entry) => entry.id === answer.id)
  availability.value = answer.available
    ? `${item.name} is in right now`
    : `${item.name} is on loan right now`
})
</script>

<template>
  <h1>Catalog</h1>
  <aside class="check">
    <h2>In right now?</h2>
    <label for="item">Thing</label>
    <select id="item" v-model="selectedId">
      <option :value="0" disabled>Please choose</option>
      <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
    <p class="availability" aria-live="polite">{{ availability }}</p>
  </aside>
  <div class="search">
    <label for="search">Search</label>
    <input id="search" v-model="query" type="search">
  </div>
  <ul class="catalog">
    <li v-for="item in visibleItems" :key="item.id">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>

<style scoped>
.check {
  max-width: 22rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
}
.check h2 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}
</style>
