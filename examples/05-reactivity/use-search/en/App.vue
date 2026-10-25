<script setup>
import { ref } from 'vue'

import { useSearch } from './useSearch.js'

const names = ['Drill', 'Jigsaw', 'Circular saw', 'Ladder']
const query = ref('')

const { visibleItems, hits } = useSearch(names, query)
</script>

<template>
  <input v-model="query" type="search" aria-label="Search">
  <p>{{ hits }} hits</p>
  <ul>
    <li v-for="name in visibleItems" :key="name">{{ name }}</li>
  </ul>
</template>
