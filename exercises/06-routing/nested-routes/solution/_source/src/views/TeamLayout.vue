<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>[%Team am Tresen|Team at the counter%]</h1>
  <nav class="team-nav" aria-label="[%Bereich des Teams|Team area%]">
    <RouterLink :to="{ name: 'team-loans' }">[%Ausleihen|Loans%]</RouterLink>
    <RouterLink :to="{ name: 'team-returns' }">[%Rückgaben|Returns%]</RouterLink>
  </nav>
  <!-- The page of the child route appears here, inside the layout -->
  <RouterView />
</template>

<style scoped>
.team-nav {
  display: flex;
  gap: 1rem;
}
/* Only the link to exactly this page, the link to the loans is active on every child */
.team-nav a[aria-current='page'] {
  font-weight: 700;
}
</style>
