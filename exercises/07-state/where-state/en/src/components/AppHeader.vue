<script setup>
defineProps({
  favoriteCount: { type: Number, default: 0 },
})
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <span>Favorites: {{ favoriteCount }}</span>
    <span>Requests: 0</span>
  </header>
</template>
