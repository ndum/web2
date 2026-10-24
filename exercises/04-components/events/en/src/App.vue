<script setup>
import { computed, ref } from 'vue'

import ItemCard from '@/components/ItemCard.vue'
import items from '../data/items.json'

const query = ref('')

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
})
</script>

<template>
  <h1>Catalog</h1>
  <label for="search">Search</label>
  <input id="search" v-model="query" type="search">
  <div class="grid">
    <ItemCard
      v-for="item in visibleItems"
      :id="item.id"
      :key="item.id"
      :name="item.name"
      :category="item.category"
      :available="item.availableFrom === null"
    />
  </div>
</template>
