<script setup>
import { ref, watch } from 'vue'

const filters = ref({ query: '', category: '' })
const log = ref([])

// A getter watches one field, the callback gets the new and the old value
watch(
  () => filters.value.category,
  (now, before) => log.value.push(`category: ${JSON.stringify(before)} -> ${JSON.stringify(now)}`),
)

// deep also notices changes inside the object
watch(filters, () => log.value.push('filters, deep'), { deep: true })

// once stops the watcher after its first call
watch(() => filters.value.query, () => log.value.push('[%erste Suche|first search%]'), { once: true })
</script>

<template>
  <input v-model="filters.query" aria-label="[%Suchen|Search%]">
  <select v-model="filters.category" aria-label="[%Kategorie|Category%]">
    <option value="">[%Alle Kategorien|All categories%]</option>
    <option>[%Werkzeug|Tools%]</option>
    <option>[%Garten|Garden%]</option>
  </select>
  <ol>
    <li v-for="(entry, index) in log" :key="index">{{ entry }}</li>
  </ol>
</template>
