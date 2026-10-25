<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { getJson } from '@/api.js'

// Loaded by hand, every visit of the page asks the course API again
const items = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    items.value = await getJson('/items')
  } catch (problem) {
    error.value = problem
  }
  loading.value = false
})
</script>

<template>
  <h1>[%Katalog|Catalog%]</h1>
  <p v-if="loading" role="status">[%Der Katalog wird geladen …|Loading the catalog …%]</p>
  <p v-else-if="error" class="error" role="alert">{{ error.message }}</p>
  <ul v-else class="catalog">
    <li v-for="item in items" :key="item.id">
      <RouterLink :to="{ name: 'item', params: { id: item.id } }">{{ item.name }}</RouterLink>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>
