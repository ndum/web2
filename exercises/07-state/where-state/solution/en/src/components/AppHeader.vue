<script setup>
import { requests } from '@/requests.js'

defineProps({
  favoriteCount: { type: Number, default: 0 },
})
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <span>Favorites: {{ favoriteCount }}</span>
    <span>Requests: {{ requests.length }}</span>
  </header>
</template>
