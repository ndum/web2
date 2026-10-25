<script setup>
import ItemCard from './components/ItemCard.vue'
import { items } from './items.js'
</script>

<template>
  <h1>Lorraine Commons</h1>
  <div class="grid">
    <ItemCard v-for="item in items" :key="item.id" :name="item.name" :category="item.category" />
  </div>
</template>