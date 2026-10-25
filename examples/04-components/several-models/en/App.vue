<script setup>
import { ref } from 'vue'

import FilterBar from './FilterBar.vue'

const query = ref('')
const category = ref('')
const categories = ['Camping', 'Garden', 'Tools']
</script>

<template>
  <FilterBar v-model:query="query" v-model:category="category" :categories="categories" />
  <p>{{ JSON.stringify({ query, category }) }}</p>
</template>
