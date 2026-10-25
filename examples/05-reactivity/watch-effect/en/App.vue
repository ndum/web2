<script setup>
import { ref, watchEffect } from 'vue'

const query = ref('')
const category = ref('')

// watchEffect runs at once and again whenever a value it read changes
watchEffect(() => {
  console.log('Search', JSON.stringify(query.value), JSON.stringify(category.value))
})
</script>

<template>
  <input v-model="query" aria-label="Search">
  <select v-model="category" aria-label="Category">
    <option value="">All categories</option>
    <option>Tools</option>
    <option>Garden</option>
  </select>
</template>
