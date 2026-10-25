<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink to="/">[%Katalog|Catalog%]</RouterLink>
    <RouterLink to="/association">[%Verein|Association%]</RouterLink>
  </nav>
  <p>[%Adresse|Address%]: {{ route.fullPath }}</p>
  <!-- The component of the current route appears here -->
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
</style>
