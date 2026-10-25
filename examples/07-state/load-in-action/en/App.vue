<script setup>
import { ref } from 'vue'

import { useCatalogStore } from './catalog.js'

const catalog = useCatalogStore()
const address = ref('/api/items')
catalog.load(address.value)
</script>

<template>
  <p>
    <label for="address">Address</label>
    <select id="address" v-model="address" @change="catalog.load(address)">
      <option value="/api/items">normal</option>
      <option value="/api/items?delay=3000">slow</option>
      <option value="/api/items?status=503">with an error</option>
    </select>
  </p>
  <p v-if="catalog.status === 'loading'" role="status">Loading the catalog …</p>
  <div v-else-if="catalog.status === 'error'" role="alert">
    <p>{{ catalog.error }}</p>
    <button type="button" @click="catalog.load(address)">Try again</button>
  </div>
  <ul v-else>
    <li v-for="thing in catalog.items" :key="thing.id">{{ thing.name }}</li>
  </ul>
</template>
