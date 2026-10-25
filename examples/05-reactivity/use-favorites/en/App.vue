<script setup>
import { useFavorites } from './useFavorites.js'

const items = [
  { id: 1, name: 'Drill' },
  { id: 3, name: 'Raclette oven' },
  { id: 6, name: 'Projector' },
]

const { isFavorite, toggle, count } = useFavorites()
</script>

<template>
  <p>{{ count }} favorites</p>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
      <button type="button" :aria-pressed="isFavorite(item.id)" @click="toggle(item.id)">Favorite</button>
    </li>
  </ul>
</template>
