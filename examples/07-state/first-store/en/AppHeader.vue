<script setup>
import { useFavoritesStore } from './favorites.js'

// Every component that calls the function gets the same store
const favorites = useFavoritesStore()
</script>

<template>
  <header>
    <strong>Lorraine Commons</strong>
    <span>Favorites: {{ favorites.count }}</span>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
