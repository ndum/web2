<script setup>
import { computed, onMounted, ref } from 'vue'

import ItemCard from '@/components/ItemCard.vue'
import { useFavoritesStore } from '@/stores/favorites.js'

const favorites = useFavoritesStore()
const items = ref([])

onMounted(async () => {
  const response = await fetch('/api/[%de|en%]/items')
  items.value = await response.json()
})

const favoriteItems = computed(() => items.value.filter((item) => favorites.isFavorite(item.id)))
</script>

<template>
  <h1>[%Favoriten|Favorites%]</h1>
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
  <p v-else>[%Noch keine Favoriten.|No favorites yet.%]</p>
</template>
