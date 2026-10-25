<script setup>
import { computed, ref } from 'vue'

import items from '../../data/items.json'
import { favoriteIds, toggleFavorite } from '@/favorites.js'

const query = ref('')
const category = ref('')
const categories = [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, '[%de-CH|en%]'))

const visible = computed(() =>
  items.filter(
    (item) =>
      (category.value === '' || item.category === category.value) &&
      item.name.toLowerCase().includes(query.value.trim().toLowerCase()),
  ),
)
</script>

<template>
  <section>
    <h2>[%Suche|Search%]</h2>
    <input v-model="query" type="search" placeholder="[%Suchen|Search%]">
    <select v-model="category">
      <option value="">[%Alle Kategorien|All categories%]</option>
      <option v-for="name in categories" :key="name">{{ name }}</option>
    </select>
    <p class="hits">{{ visible.length }} [%Dinge gefunden|things found%]</p>
    <ul class="catalog">
      <li v-for="item in visible" :key="item.id">
        {{ item.name }}
        <span class="favorite" @click="toggleFavorite(item.id)">{{ favoriteIds.includes(item.id) ? '★' : '☆' }}</span>
      </li>
    </ul>
  </section>
</template>
