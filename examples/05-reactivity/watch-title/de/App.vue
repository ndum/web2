<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const title = ref('')

// The title of the browser tab lies outside the component, so a watcher sets it
watch(
  query,
  (text) => {
    document.title = text === '' ? 'Lorraine Commons' : `${text} · Lorraine Commons`
    title.value = document.title
  },
  { immediate: true },
)
</script>

<template>
  <label for="search">Suchen</label>
  <input id="search" v-model="query" type="search">
  <p>Titel des Tabs: {{ title }}</p>
</template>
