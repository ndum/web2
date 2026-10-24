<script setup>
import items from '../data/items.json'

import { formatDate } from './format.js'
</script>

<template>
  <h1>Catalog</h1>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id" :class="{ 'on-loan': item.availableFrom !== null }">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
      <span v-if="item.availableFrom === null" class="state">Available</span>
      <span v-else class="state">Available again from {{ formatDate(item.availableFrom) }}</span>
    </li>
  </ul>
</template>
