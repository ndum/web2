<script setup>
import { ref } from 'vue'

import { useSearch } from './useSearch.js'

const names = ['[%Bohrmaschine|Drill%]', '[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]', '[%Leiter|Ladder%]']
const query = ref('')

const { visibleItems, hits } = useSearch(names, query)
</script>

<template>
  <input v-model="query" type="search" aria-label="[%Suchen|Search%]">
  <p>{{ hits }} [%Treffer|hits%]</p>
  <ul>
    <li v-for="name in visibleItems" :key="name">{{ name }}</li>
  </ul>
</template>
