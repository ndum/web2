<script setup>
defineProps({ count: { type: Number, required: true } })
</script>

<template>
  <header>
    <strong>Lorraine Commons</strong>
    <span>Favorites: {{ count }}</span>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
