<script setup>
import { requests } from '@/requests.js'

defineProps({
  favoriteCount: { type: Number, default: 0 },
})
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <span>Favoriten: {{ favoriteCount }}</span>
    <span>Anfragen: {{ requests.length }}</span>
  </header>
</template>
