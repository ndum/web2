<script setup>
import CatalogView from '@/views/CatalogView.vue'
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
  </header>
  <main>
    <CatalogView />
  </main>
</template>

<style scoped>
.site {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
  margin: -1rem -1.5rem 1rem;
  padding: 0.75rem 1.5rem;
  background: #1f6b4f;
  color: #ffffff;
}
.brand {
  font-weight: 700;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.site a {
  color: #ffffff;
}
</style>
