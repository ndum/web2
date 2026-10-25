<script setup>
// Presentational, the card only shows what it gets and reports the click
defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  favorite: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <li class="card">
    <strong>{{ name }}</strong>
    <span>{{ category }}</span>
    <button type="button" :aria-pressed="favorite" @click="emit('toggle-favorite', id)">Favorite</button>
  </li>
</template>

<style scoped>
.card {
  display: flex;
  gap: 1rem;
  align-items: baseline;
}
</style>
