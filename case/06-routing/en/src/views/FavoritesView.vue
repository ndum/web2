<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'

import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
import { catalogKey, favoritesKey } from '@/keys.js'

const { items } = inject(catalogKey)
const { favorites, isFavorite, toggle } = inject(favoritesKey)

// The favourite things in the order in which they were marked, ids the catalog no longer knows drop out
const favoriteItems = computed(() =>
  favorites.value.map((id) => items.value.find((item) => item.id === id)).filter((item) => item !== undefined),
)
</script>

<template>
  <section>
    <h1 tabindex="-1">Favorites</h1>
    <ItemList :items="favoriteItems">
      <template #item="{ item }">
        <ItemCard
          :id="item.id"
          :name="item.name"
          :category="item.category"
          :available="item.availableFrom === null"
          :favorite="isFavorite(item.id)"
          @toggle-favorite="toggle"
        />
      </template>
      <template #empty>
        No favorites yet. In the <RouterLink :to="{ name: 'catalog' }">catalog</RouterLink>
        you mark things with "Favorite".
      </template>
    </ItemList>
  </section>
</template>
