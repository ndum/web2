<script setup>
import { useQuery } from '@pinia/colada'
import { RouterLink } from 'vue-router'

import { getJson } from '@/api.js'

// The answer stays in the cache under the key, a second visit shows it right away
const { data: items, error, isPending } = useQuery({
  key: ['items'],
  query: ({ signal }) => getJson('/items', { signal }),
})
</script>

<template>
  <h1>Katalog</h1>
  <p v-if="isPending" role="status">Der Katalog wird geladen …</p>
  <p v-else-if="error" class="error" role="alert">{{ error.message }}</p>
  <ul v-else class="catalog">
    <li v-for="item in items" :key="item.id">
      <RouterLink :to="{ name: 'item', params: { id: item.id } }">{{ item.name }}</RouterLink>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>
