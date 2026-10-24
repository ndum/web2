<script setup>
import ItemCard from './ItemCard.vue'
</script>

<template>
  <h1>Catalog</h1>
  <div class="grid">
    <ItemCard name="Drill" category="Tools" />
    <ItemCard name="Tent for four" category="Camping" :available="false" />
    <ItemCard name="Raclette oven" category="Kitchen" :available="true" />
  </div>
</template>

<style>
.grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}
</style>
