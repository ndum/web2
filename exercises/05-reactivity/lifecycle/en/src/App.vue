<script setup>
import { computed, ref } from 'vue'

import BaseDialog from '@/components/BaseDialog.vue'
import SearchBar from '@/components/SearchBar.vue'
import { formatDeposit } from '@/format.js'
import items from '../data/items.json'

const query = ref('')

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
})

// The thing whose details the dialog shows, null while the dialog is closed
const selected = ref(null)
</script>

<template>
  <h1>Catalog</h1>
  <SearchBar v-model="query" />
  <ul class="catalog">
    <li v-for="item in visibleItems" :key="item.id">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
      <button type="button" class="details" @click="selected = item">Details</button>
    </li>
  </ul>
  <BaseDialog v-if="selected" @close="selected = null">
    <template #title>{{ selected.name }}</template>
    <p>{{ selected.category }}, deposit {{ formatDeposit(selected.deposit) }}</p>
    <p>{{ selected.availableFrom === null ? 'Available' : 'On loan' }}</p>
  </BaseDialog>
</template>
