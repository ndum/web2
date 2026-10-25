<script setup>
import ItemCard from './ItemCard.vue'
</script>

<template>
  <h1>[%Katalog|Catalog%]</h1>
  <div class="grid">
    <ItemCard name="[%Bohrmaschine|Drill%]" category="[%Werkzeug|Tools%]" />
    <ItemCard name="[%Zelt für vier Personen|Tent for four%]" category="[%Camping|Camping%]" :available="false" />
    <ItemCard name="[%Raclette-Ofen|Raclette oven%]" category="[%Küche|Kitchen%]" :available="true" />
  </div>
</template>

<style>
.grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}
</style>
