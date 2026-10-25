<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'catalog' }">[%Katalog|Catalog%]</RouterLink>
    <RouterLink :to="{ name: 'favorites' }">[%Favoriten|Favorites%]</RouterLink>
    <RouterLink :to="{ name: 'association' }">[%Verein|Association%]</RouterLink>
  </nav>
  <p>[%Adresse|Address%]: {{ route.fullPath }}</p>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
