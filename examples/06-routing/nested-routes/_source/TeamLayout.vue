<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>[%Team am Tresen|Team at the counter%]</h1>
  <nav>
    <RouterLink to="/team">[%Ausleihen|Loans%]</RouterLink>
    <RouterLink to="/team/returns">[%Rückgaben|Returns%]</RouterLink>
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
