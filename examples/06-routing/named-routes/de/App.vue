<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'catalog' }">Katalog</RouterLink>
    <RouterLink :to="{ name: 'favorites' }">Favoriten</RouterLink>
    <RouterLink :to="{ name: 'association' }">Verein</RouterLink>
  </nav>
  <p>Adresse: {{ route.fullPath }}</p>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
