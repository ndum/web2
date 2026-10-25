<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink to="/">Catalog</RouterLink>
    <RouterLink to="/favorites">Favorites</RouterLink>
    <RouterLink to="/association">Association</RouterLink>
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
/* Vue Router sets this class on the link to the current route */
.router-link-active {
  font-weight: 700;
}
/* The link to exactly this page also gets aria-current="page" for screen readers */
[aria-current='page'] {
  text-decoration: underline 3px;
}
</style>
