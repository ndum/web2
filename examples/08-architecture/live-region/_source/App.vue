<script setup>
import { computed, ref } from 'vue'

import { things } from './things.js'

const query = ref('')
const hits = computed(() => things.filter((thing) => thing.name.toLowerCase().includes(query.value.trim().toLowerCase())))
</script>

<template>
  <label for="search">[%Suchen|Search%]</label>
  <input id="search" v-model="query" type="search">
  <!-- The live region is there from the start, a screen reader announces each new text -->
  <p role="status">{{ hits.length }} [%Dinge gefunden|things found%]</p>
  <ul>
    <li v-for="thing in hits" :key="thing.id">{{ thing.name }}</li>
  </ul>
</template>
