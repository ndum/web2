<script setup>
import ItemCard from './ItemCard.vue'
</script>

<template>
  <h1>Katalog</h1>
  <div class="grid">
    <ItemCard name="Bohrmaschine" category="Werkzeug" />
    <ItemCard name="Zelt für vier Personen" category="Camping" />
    <ItemCard name="Raclette-Ofen" category="Küche" />
  </div>
</template>

<style>
.grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}
</style>
