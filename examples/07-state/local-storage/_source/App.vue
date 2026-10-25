<script setup>
import { useFavoritesStore } from './favorites.js'
import { things } from './things.js'

const favorites = useFavoritesStore()
</script>

<template>
  <p>[%Favoriten|Favorites%]: {{ favorites.count }}</p>
  <ul>
    <li v-for="thing in things" :key="thing.id">
      {{ thing.name }}
      <button type="button" :aria-pressed="favorites.isFavorite(thing.id)" @click="favorites.toggle(thing.id)">[%Favorit|Favorite%]</button>
    </li>
  </ul>
</template>

<style scoped>
[aria-pressed='true'] {
  font-weight: 700;
}
</style>
