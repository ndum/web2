<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useFavoritesStore } from '@/stores/favorites.js'

const favorites = useFavoritesStore()
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="Main navigation">
      <RouterLink :to="{ name: 'catalog' }">Catalog</RouterLink>
    </nav>
    <span class="count">Favorites: {{ favorites.count }}</span>
  </header>
  <main>
    <RouterView />
  </main>
</template>
