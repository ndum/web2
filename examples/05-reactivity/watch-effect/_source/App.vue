<script setup>
import { ref, watchEffect } from 'vue'

const query = ref('')
const category = ref('')

// watchEffect runs at once and again whenever a value it read changes
watchEffect(() => {
  console.log('[%Suche|Search%]', JSON.stringify(query.value), JSON.stringify(category.value))
})
</script>

<template>
  <input v-model="query" aria-label="[%Suchen|Search%]">
  <select v-model="category" aria-label="[%Kategorie|Category%]">
    <option value="">[%Alle Kategorien|All categories%]</option>
    <option>[%Werkzeug|Tools%]</option>
    <option>[%Garten|Garden%]</option>
  </select>
</template>
