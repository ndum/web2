<script setup>
import { ref } from 'vue'
import ItemCard from './ItemCard.vue'

const items = ref([
  { id: 1, name: 'Drill', category: 'Tools', available: true },
  { id: 2, name: 'Tent for four', category: 'Camping', available: false },
  { id: 3, name: 'Raclette oven', category: 'Kitchen', available: true },
  { id: 4, name: 'Beer bench set', category: 'Parties', available: true },
])
</script>

<template>
  <h1>Catalog</h1>
  <div class="grid">
    <ItemCard v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<style>
.grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}
</style>
