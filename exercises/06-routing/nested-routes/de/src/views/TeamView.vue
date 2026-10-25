<script setup>
import { formatDate } from '@/format.js'
import items from '../../data/items.json'

// The things on loan, the next one to come back first
const loans = items
  .filter((item) => item.availableFrom !== null)
  .toSorted((a, b) => a.availableFrom.localeCompare(b.availableFrom))
</script>

<template>
  <h1>Team am Tresen</h1>
  <h2>Ausleihen</h2>
  <ul class="loans">
    <li v-for="item in loans" :key="item.id">{{ item.name }}, zurück ab {{ formatDate(item.availableFrom) }}</li>
  </ul>
</template>
