<script setup>
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
    <span class="category">{{ category }}</span>
    <button type="button" :aria-pressed="favorite" @click="emit('toggle-favorite', id)">[%Favorit|Favorite%]</button>
  </li>
</template>
