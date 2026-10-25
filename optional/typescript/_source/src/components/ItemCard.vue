<script setup lang="ts">
import type { Item } from '../types'

// The types describe the props and the events, vue-tsc checks every use of the component
const { item, favorite = false } = defineProps<{
  item: Item
  favorite?: boolean
}>()

const emit = defineEmits<{
  toggleFavorite: [id: number]
}>()
</script>

<template>
  <article class="card">
    <h2>{{ item.name }}</h2>
    <p>{{ item.category }}, CHF {{ item.deposit }} [%Pfand|deposit%]</p>
    <button type="button" :aria-pressed="favorite" @click="emit('toggleFavorite', item.id)">
      {{ favorite ? '[%Favorit entfernen|Remove favorite%]' : '[%Als Favorit merken|Save as favorite%]' }}
    </button>
  </article>
</template>
