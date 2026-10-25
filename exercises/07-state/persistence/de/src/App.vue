<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useFavoritesStore } from '@/stores/favorites.js'

const favorites = useFavoritesStore()
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="Hauptnavigation">
      <RouterLink :to="{ name: 'catalog' }">Katalog</RouterLink>
    </nav>
    <span class="count">Favoriten: {{ favorites.count }}</span>
  </header>
  <main>
    <RouterView />
  </main>
</template>
