<script setup>
import { ref } from 'vue'

import AppHeader from '@/components/AppHeader.vue'
import ItemList from '@/components/ItemList.vue'
import RequestList from '@/components/RequestList.vue'

// Header and list both need the favorites, so they live in their common parent
const favorites = ref([])

function toggleFavorite(id) {
  favorites.value = favorites.value.includes(id) ? favorites.value.filter((entry) => entry !== id) : [...favorites.value, id]
}
</script>

<template>
  <AppHeader :favorite-count="favorites.length" />
  <main>
    <h1>Catalog</h1>
    <RequestList />
    <ItemList :favorites="favorites" @toggle-favorite="toggleFavorite" />
  </main>
</template>
