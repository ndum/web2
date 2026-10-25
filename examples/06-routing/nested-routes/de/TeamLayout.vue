<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>Team am Tresen</h1>
  <nav>
    <RouterLink to="/team">Ausleihen</RouterLink>
    <RouterLink to="/team/returns">Rückgaben</RouterLink>
  </nav>
  <!-- The page of the child route appears here, inside the layout -->
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
/* Only the link to exactly this page, the loans link is active on every child */
.router-link-exact-active {
  text-decoration: underline 3px;
}
</style>
