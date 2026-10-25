<script setup>
import { computed } from 'vue'

import ItemCard from '@/components/ItemCard.vue'
import { useCatalogStore } from '@/features/catalog'

import { useFavoritesStore } from './favoritesStore.js'

const catalog = useCatalogStore()
const favorites = useFavoritesStore()
catalog.load()

const favoriteItems = computed(() => catalog.items.filter((item) => favorites.isFavorite(item.id)))
</script>

<template>
  <h1>Favoriten</h1>
  <ul v-if="favoriteItems.length > 0" class="catalog">
    <ItemCard
      v-for="item in favoriteItems"
      :id="item.id"
      :key="item.id"
      :name="item.name"
      :category="item.category"
      favorite
      @toggle-favorite="favorites.toggle"
    />
  </ul>
  <p v-else>Noch keine Favoriten.</p>
</template>
