<script setup>
import { computed, ref } from 'vue'

import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import items from '../data/items.json'

const query = ref('')

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
})
</script>

<template>
  <AppHeader />
  <main>
    <h1>Catalog</h1>
    <label for="search">Search</label>
    <input id="search" v-model="query" type="search">
    <ul class="catalog">
      <li v-for="item in visibleItems" :key="item.id">
        <span class="name">{{ item.name }}</span>
        <span class="category">{{ item.category }}</span>
      </li>
    </ul>
  </main>
  <AppFooter />
</template>
