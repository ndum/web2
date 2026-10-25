<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { useFavoritesStore } from '@/features/favorites'

const { count } = storeToRefs(useFavoritesStore())
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <RouterLink to="/">[%Katalog|Catalog%]</RouterLink>
    <RouterLink to="/favorites">[%Favoriten|Favorites%] ({{ count }})</RouterLink>
  </header>
</template>
