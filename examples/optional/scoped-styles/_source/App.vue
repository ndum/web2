<script setup>
import PriceTag from './PriceTag.vue'
</script>

<template>
  <article class="card">
    <h2>[%Bohrmaschine|Drill%]</h2>
    <PriceTag :deposit="20" />
  </article>
  <p class="price">[%Dieser Absatz ist kein Teil der Karte und bleibt normal.|This paragraph is not part of the card and stays plain.%]</p>
</template>

<style scoped>
.card {
  max-width: 16rem;
  padding: 0.75rem;
  border: 1px solid #c8c8c8;
  border-radius: 0.5rem;
}

h2 {
  margin: 0 0 0.5rem;
}

/* The root element of a child also carries the attribute of this component, so this rule reaches it */
.card .price {
  font-weight: 700;
}

/* An element inside the child is only reached through :deep() */
.card :deep(.currency) {
  color: #2e7d32;
}
</style>
