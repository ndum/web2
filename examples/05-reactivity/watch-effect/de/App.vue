<script setup>
import { ref, watchEffect } from 'vue'

const query = ref('')
const category = ref('')

// watchEffect runs at once and again whenever a value it read changes
watchEffect(() => {
  console.log('Suche', JSON.stringify(query.value), JSON.stringify(category.value))
})
</script>

<template>
  <input v-model="query" aria-label="Suchen">
  <select v-model="category" aria-label="Kategorie">
    <option value="">Alle Kategorien</option>
    <option>Werkzeug</option>
    <option>Garten</option>
  </select>
</template>
