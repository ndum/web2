<script setup>
import { ref } from 'vue'

import ItemCard from './ItemCard.vue'
import { things } from './things.js'

// The container holds the state and decides what a click means
const favorites = ref([])

function toggle(id) {
  favorites.value = favorites.value.includes(id) ? favorites.value.filter((entry) => entry !== id) : [...favorites.value, id]
}
</script>

<template>
  <p>[%Favoriten|Favorites%]: {{ favorites.length }}</p>
  <ul>
    <ItemCard
      v-for="thing in things"
      :id="thing.id"
      :key="thing.id"
      :name="thing.name"
      :category="thing.category"
      :favorite="favorites.includes(thing.id)"
      @toggle-favorite="toggle"
    />
  </ul>
</template>
