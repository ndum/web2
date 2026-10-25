<script setup>
defineProps({
  favoriteCount: { type: Number, default: 0 },
})
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <span>Favoriten: {{ favoriteCount }}</span>
    <span>Anfragen: 0</span>
  </header>
</template>
