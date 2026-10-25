<script setup>
import { useFavorites } from './useFavorites.js'

const items = [
  { id: 1, name: '[%Bohrmaschine|Drill%]' },
  { id: 3, name: '[%Raclette-Ofen|Raclette oven%]' },
  { id: 6, name: '[%Beamer|Projector%]' },
]

const { isFavorite, toggle, count } = useFavorites()
</script>

<template>
  <p>{{ count }} [%Favoriten|favorites%]</p>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
      <button type="button" :aria-pressed="isFavorite(item.id)" @click="toggle(item.id)">[%Favorit|Favorite%]</button>
    </li>
  </ul>
</template>
