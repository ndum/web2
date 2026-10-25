<script setup>
import { things } from './things.js'

defineProps({ favorites: { type: Array, required: true } })
// The list only reports a click, the parent changes the favorites
const emit = defineEmits(['toggle'])
</script>

<template>
  <ul>
    <li v-for="thing in things" :key="thing.id">
      {{ thing.name }}
      <button type="button" :aria-pressed="favorites.includes(thing.id)" @click="emit('toggle', thing.id)">Favorit</button>
    </li>
  </ul>
</template>

<style scoped>
[aria-pressed='true'] {
  font-weight: 700;
}
</style>
