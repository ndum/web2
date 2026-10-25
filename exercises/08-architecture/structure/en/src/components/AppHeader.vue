<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { useFavoritesStore } from '@/stores/favorites.js'

const { count } = storeToRefs(useFavoritesStore())
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <RouterLink to="/">Catalog</RouterLink>
    <RouterLink to="/favorites">Favorites ({{ count }})</RouterLink>
  </header>
</template>
