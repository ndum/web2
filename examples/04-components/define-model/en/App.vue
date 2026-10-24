<script setup>
import { computed, ref } from 'vue'

import SearchBar from './SearchBar.vue'

const names = ['Drill', 'Jigsaw', 'Circular saw', 'Ladder', 'Projector']
const query = ref('')

const visibleNames = computed(() => names.filter((name) => name.toLowerCase().includes(query.value.trim().toLowerCase())))
</script>

<template>
  <SearchBar v-model="query" />
  <p>Search text in App: {{ JSON.stringify(query) }}</p>
  <ul>
    <li v-for="name in visibleNames" :key="name">{{ name }}</li>
  </ul>
</template>
