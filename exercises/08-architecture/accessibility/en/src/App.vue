<script setup>
import { computed } from 'vue'

import items from '../data/items.json'
import FavoritesList from '@/components/FavoritesList.vue'
import RequestForm from '@/components/RequestForm.vue'
import SearchPanel from '@/components/SearchPanel.vue'
import { favoriteIds, removeFavorite } from '@/favorites.js'

const favoriteItems = computed(() => favoriteIds.value.map((id) => items.find((item) => item.id === id)))
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
  </header>
  <main>
    <h1>Catalog and favorites</h1>
    <SearchPanel />
    <FavoritesList :items="favoriteItems" @remove="removeFavorite" />
    <RequestForm />
  </main>
</template>
