<script setup>
import { useFavorites } from './useFavorites.js'

const items = [
  { id: 1, name: 'Bohrmaschine' },
  { id: 3, name: 'Raclette-Ofen' },
  { id: 6, name: 'Beamer' },
]

const { isFavorite, toggle, count } = useFavorites()
</script>

<template>
  <p>{{ count }} Favoriten</p>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
      <button type="button" :aria-pressed="isFavorite(item.id)" @click="toggle(item.id)">Favorit</button>
    </li>
  </ul>
</template>
