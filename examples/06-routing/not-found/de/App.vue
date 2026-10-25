<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink to="/">Katalog</RouterLink>
    <RouterLink to="/association">Verein</RouterLink>
    <RouterLink to="/vereinsabend/2026">Ein alter Link</RouterLink>
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
