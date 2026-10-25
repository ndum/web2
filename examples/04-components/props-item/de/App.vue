<script setup>
import { ref } from 'vue'
import ItemCard from './ItemCard.vue'

const items = ref([
  { id: 1, name: 'Bohrmaschine', category: 'Werkzeug', available: true },
  { id: 2, name: 'Zelt für vier Personen', category: 'Camping', available: false },
  { id: 3, name: 'Raclette-Ofen', category: 'Küche', available: true },
  { id: 4, name: 'Festbankgarnitur', category: 'Feste', available: true },
])
</script>

<template>
  <h1>Katalog</h1>
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
