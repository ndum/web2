<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink to="/">Catalog</RouterLink>
    <RouterLink to="/team">Team</RouterLink>
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
/* Also active on every page below the link, here on the pages of the team */
.router-link-active {
  font-weight: 700;
}
</style>
