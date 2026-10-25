<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Katalog</RouterLink>
    <RouterLink to="/team">Team</RouterLink>
  </nav>
  <div class="columns">
    <RouterView />
    <!-- A second, named place, it stays empty when the route has nothing for it -->
    <RouterView name="aside" />
  </div>
</template>

<style scoped>
nav,
.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
