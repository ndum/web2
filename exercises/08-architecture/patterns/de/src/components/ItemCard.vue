<script setup>
import { formatDeposit } from '@/format.js'
import { useFavoritesStore } from '@/stores/favorites.js'

defineProps({ thing: { type: Object, required: true } })

const favorites = useFavoritesStore()
</script>

<template>
  <li class="card">
    <strong>{{ thing.title }}</strong>
    <span class="category">{{ thing.group }}</span>
    <span class="deposit">{{ formatDeposit(thing.depositCents / 100) }}</span>
    <button type="button" :aria-pressed="favorites.isFavorite(thing.itemId)" @click="favorites.toggle(thing.itemId)">
      Favorit
    </button>
  </li>
</template>
