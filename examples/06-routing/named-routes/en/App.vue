<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'catalog' }">Catalog</RouterLink>
    <RouterLink :to="{ name: 'favorites' }">Favorites</RouterLink>
    <RouterLink :to="{ name: 'association' }">Association</RouterLink>
  </nav>
  <p>Address: {{ route.fullPath }}</p>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
