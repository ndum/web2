<script setup>
import { add } from '@/requests.js'
import items from '../../data/items.json'

defineProps({
  favorites: { type: Array, required: true },
})

// The list only reports a click on the favorite button, App changes the favorites
const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
      <button type="button" class="favorite" :aria-pressed="favorites.includes(item.id)" @click="emit('toggle-favorite', item.id)">[%Favorit|Favorite%]</button>
      <button type="button" class="request" @click="add(item)">[%Anfragen|Request%]</button>
    </li>
  </ul>
</template>
