<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

import items from '../data/items.json'

const online = ref(navigator.onLine)
const update = () => (online.value = navigator.onLine)

onMounted(() => {
  window.addEventListener('online', update)
  window.addEventListener('offline', update)
})

onUnmounted(() => {
  window.removeEventListener('online', update)
  window.removeEventListener('offline', update)
})
</script>

<template>
  <main>
    <h1>[%Katalog|Catalog%]</h1>
    <p role="status">{{ online ? '[%Online|Online%]' : '[%Offline, der Katalog kommt aus dem Cache.|Offline, the catalog comes from the cache.%]' }}</p>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </main>
</template>
