<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="[%Hauptnavigation|Main navigation%]">
      <RouterLink :to="{ name: 'catalog' }">[%Katalog|Catalog%]</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
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
/* RouterLink marks the link to the current page with aria-current="page" */
.site a[aria-current='page'] {
  font-weight: 700;
  text-decoration: underline 2px;
}
</style>
