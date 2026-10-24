<script setup>
import { computed, ref } from 'vue'

import SearchBar from './SearchBar.vue'

const names = ['[%Bohrmaschine|Drill%]', '[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]', '[%Leiter|Ladder%]', '[%Beamer|Projector%]']
const query = ref('')

const visibleNames = computed(() => names.filter((name) => name.toLowerCase().includes(query.value.trim().toLowerCase())))
</script>

<template>
  <SearchBar v-model="query" />
  <p>[%Suchtext in App|Search text in App%]: {{ JSON.stringify(query) }}</p>
  <ul>
    <li v-for="name in visibleNames" :key="name">{{ name }}</li>
  </ul>
</template>
