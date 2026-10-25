<script setup>
import ItemCard from '@/components/ItemCard.vue'
import { useFavoritesStore } from '@/features/favorites'

import { useCatalogStore } from './catalogStore.js'

const catalog = useCatalogStore()
const favorites = useFavoritesStore()
catalog.load()
</script>

<template>
  <h1>[%Katalog|Catalog%]</h1>
  <p v-if="catalog.status === 'error'" class="error">[%Der Katalog lässt sich nicht laden.|The catalog cannot be loaded.%]</p>
  <p v-else-if="catalog.status !== 'ready'">[%Der Katalog wird geladen …|Loading the catalog …%]</p>
  <ul v-else class="catalog">
    <ItemCard
      v-for="item in catalog.items"
      :id="item.id"
      :key="item.id"
      :name="item.name"
      :category="item.category"
      :favorite="favorites.isFavorite(item.id)"
      @toggle-favorite="favorites.toggle"
    />
  </ul>
</template>
