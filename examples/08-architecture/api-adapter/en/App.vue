<script setup>
import { onMounted, ref } from 'vue'

import { useApi } from './api.js'

const api = useApi()
const items = ref([])
const error = ref('')

onMounted(async () => {
  const { ok, data } = await api.loadItems()
  if (ok) items.value = data
  else error.value = data.error
})
</script>

<template>
  <p v-if="error" role="alert">{{ error }}</p>
  <ul v-else>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
