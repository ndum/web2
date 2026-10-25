<script setup>
import { ref } from 'vue'

import AppHeader from './AppHeader.vue'
import ItemList from './ItemList.vue'

// Header and list both need the favorites, so they live in their common parent
const favorites = ref([])

function toggle(id) {
  favorites.value = favorites.value.includes(id) ? favorites.value.filter((entry) => entry !== id) : [...favorites.value, id]
}
</script>

<template>
  <AppHeader :count="favorites.length" />
  <ItemList :favorites="favorites" @toggle="toggle" />
</template>
