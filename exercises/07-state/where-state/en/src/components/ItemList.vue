<script setup>
import { ref } from 'vue'

import items from '../../data/items.json'

// The favorites live in the list, the header does not know them
const favorites = ref([])

function toggleFavorite(id) {
  favorites.value = favorites.value.includes(id) ? favorites.value.filter((entry) => entry !== id) : [...favorites.value, id]
}
</script>

<template>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
      <button type="button" class="favorite" :aria-pressed="favorites.includes(item.id)" @click="toggleFavorite(item.id)">Favorite</button>
      <button type="button" class="request">Request</button>
    </li>
  </ul>
</template>
