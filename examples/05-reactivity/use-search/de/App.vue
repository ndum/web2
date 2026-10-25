<script setup>
import { ref } from 'vue'

import { useSearch } from './useSearch.js'

const names = ['Bohrmaschine', 'Stichsäge', 'Kreissäge', 'Leiter']
const query = ref('')

const { visibleItems, hits } = useSearch(names, query)
</script>

<template>
  <input v-model="query" type="search" aria-label="Suchen">
  <p>{{ hits }} Treffer</p>
  <ul>
    <li v-for="name in visibleItems" :key="name">{{ name }}</li>
  </ul>
</template>
