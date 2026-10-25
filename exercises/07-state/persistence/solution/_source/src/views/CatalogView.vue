<script setup>
import { RouterLink } from 'vue-router'

import { useFavoritesStore } from '@/stores/favorites.js'
import items from '../../data/items.json'

const favorites = useFavoritesStore()
</script>

<template>
  <h1>[%Katalog|Catalog%]</h1>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id">
      <RouterLink :to="{ name: 'item', params: { id: item.id } }">{{ item.name }}</RouterLink>
      <span class="category">{{ item.category }}</span>
      <button type="button" class="favorite" :aria-pressed="favorites.isFavorite(item.id)" @click="favorites.toggle(item.id)">[%Favorit|Favorite%]</button>
    </li>
  </ul>
</template>
