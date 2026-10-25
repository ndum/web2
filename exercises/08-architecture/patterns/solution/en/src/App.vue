<script setup>
import { storeToRefs } from 'pinia'

import { useFavoritesStore } from '@/stores/favorites.js'
import CatalogView from '@/views/CatalogView.vue'

const { count } = storeToRefs(useFavoritesStore())
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <span class="favorites">Favorites: {{ count }}</span>
  </header>
  <main>
    <CatalogView />
  </main>
</template>
