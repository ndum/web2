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
    <label for="search">[%Suchen|Search%]</label>
    <input id="search" v-model="query" type="search">
    <label for="category">[%Kategorie|Category%]</label>
    <select id="category" v-model="category">
      <option value="">[%Alle Kategorien|All categories%]</option>
      <option v-for="name in categories" :key="name">{{ name }}</option>
    </select>
    <!-- A live region exists from the start, a screen reader announces every new number -->
    <p class="hits" role="status">{{ visible.length }} [%Dinge gefunden|things found%]</p>
    <ul class="catalog">
      <li v-for="item in visible" :key="item.id">
        {{ item.name }}
        <!-- A real button with its state, the star is decoration and the hidden text its name -->
        <button type="button" class="favorite" :aria-pressed="favoriteIds.includes(item.id)" @click="toggleFavorite(item.id)">
          <span aria-hidden="true">{{ favoriteIds.includes(item.id) ? '★' : '☆' }}</span>
          <span class="visually-hidden">[%Favorit|Favorite%]: {{ item.name }}</span>
        </button>
      </li>
    </ul>
  </section>
</template>
