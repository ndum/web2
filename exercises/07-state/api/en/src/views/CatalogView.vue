<script setup>
import { RouterLink } from 'vue-router'

import { useCatalogStore } from '@/stores/catalog.js'

const catalog = useCatalogStore()
</script>

<template>
  <h1>Catalog</h1>
  <p v-if="catalog.status === 'loading'" role="status">Loading the catalog …</p>
  <div v-else-if="catalog.status === 'error'" role="alert">
    <p class="error">{{ catalog.error }}</p>
    <button type="button" @click="catalog.load()">Try again</button>
  </div>
  <ul v-else class="catalog">
    <li v-for="item in catalog.list" :key="item.id">
      <RouterLink :to="{ name: 'item', params: { id: item.id } }">{{ item.name }}</RouterLink>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>
