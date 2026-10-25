<script setup>
import { computed, ref, watch } from 'vue'

import { checkAvailability } from '@/availability.js'
import items from '../data/items.json'

const query = ref('')

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
})

// The thing whose availability the server checks, 0 before the first choice
const selectedId = ref(0)
const availability = ref('')

watch(selectedId, async (id) => {
  availability.value = 'Der Server wird gefragt …'
  const answer = await checkAvailability(id)
  const item = items.find((entry) => entry.id === answer.id)
  availability.value = answer.available
    ? `${item.name} ist jetzt da`
    : `${item.name} ist zurzeit ausgeliehen`
})
</script>

<template>
  <h1>Katalog</h1>
  <aside class="check">
    <h2>Jetzt da?</h2>
    <label for="item">Ding</label>
    <select id="item" v-model="selectedId">
      <option :value="0" disabled>Bitte wählen</option>
      <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
    <p class="availability" aria-live="polite">{{ availability }}</p>
  </aside>
  <div class="search">
    <label for="search">Suchen</label>
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
