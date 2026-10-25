<script setup>
import { computed, ref } from 'vue'

import { items } from './items.js'

const query = ref('')
const onlyAvailable = ref(false)

// Vue recalculates the list only when query or onlyAvailable change
const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter(
    (item) => item.name.toLowerCase().includes(text) && (!onlyAvailable.value || item.availableFrom === null),
  )
})

const availableCount = computed(() => items.filter((item) => item.availableFrom === null).length)
</script>

<template>
  <p>{{ availableCount }} [%von|of%] {{ items.length }} [%Dingen sind da|things are in%]</p>
  <!-- v-model keeps the field and query in step, the chapter on forms explains it -->
  <input v-model="query" type="search" aria-label="[%Im Katalog suchen|Search the catalog%]">
  <button type="button" :aria-pressed="onlyAvailable" @click="onlyAvailable = !onlyAvailable">[%Nur verfügbare|Only available%]</button>
  <ul>
    <li v-for="item in visibleItems" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
