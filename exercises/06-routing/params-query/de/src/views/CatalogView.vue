<script setup>
import { computed, ref } from 'vue'

import items from '../../data/items.json'

const query = ref('')

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
})
</script>

<template>
  <h1>Katalog</h1>
  <div class="filters">
    <div class="search">
      <label for="search">Suchen</label>
      <input id="search" v-model="query" type="search">
    </div>
  </div>
  <ul class="catalog">
    <li v-for="item in visibleItems" :key="item.id">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>
