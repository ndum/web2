<script setup>
import { storeToRefs } from 'pinia'

import { useFavoritesStore } from './favorites.js'
import { things } from './things.js'

const favorites = useFavoritesStore()
// Destructured directly, copiedCount keeps the number of this moment
const { count: copiedCount } = favorites
// storeToRefs makes a ref of every piece of state and every getter
const { count } = storeToRefs(favorites)
// Actions belong to the store and can be destructured directly
const { toggle } = favorites
</script>

<template>
  <p>Destructured directly: {{ copiedCount }}</p>
  <p>With storeToRefs: {{ count }}</p>
  <ul>
    <li v-for="thing in things" :key="thing.id">
      {{ thing.name }}
      <button type="button" @click="toggle(thing.id)">Favorite</button>
    </li>
  </ul>
</template>
