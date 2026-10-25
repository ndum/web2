<script setup>
import { ref } from 'vue'

import { useCatalogStore } from './catalog.js'

const catalog = useCatalogStore()
const address = ref('/api/items')
catalog.load(address.value)
</script>

<template>
  <p>
    <label for="address">Adresse</label>
    <select id="address" v-model="address" @change="catalog.load(address)">
      <option value="/api/items">normal</option>
      <option value="/api/items?delay=3000">langsam</option>
      <option value="/api/items?status=503">mit Fehler</option>
    </select>
  </p>
  <p v-if="catalog.status === 'loading'" role="status">Der Katalog wird geladen …</p>
  <div v-else-if="catalog.status === 'error'" role="alert">
    <p>{{ catalog.error }}</p>
    <button type="button" @click="catalog.load(address)">Nochmals versuchen</button>
  </div>
  <ul v-else>
    <li v-for="thing in catalog.items" :key="thing.id">{{ thing.name }}</li>
  </ul>
</template>
