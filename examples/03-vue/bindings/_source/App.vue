<script setup>
const drill = { id: 1, name: '[%Bohrmaschine|Drill%]', deposit: 20, availableFrom: null }
const tent = { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', deposit: 50, availableFrom: '2026-11-12' }
</script>

<template>
  <!-- The colon binds an attribute to an expression, :href is short for v-bind:href -->
  <article class="card" :class="{ 'on-loan': drill.availableFrom !== null }">
    <a :href="'#/items/' + drill.id">{{ drill.name }}</a>
    <button type="button" :disabled="drill.availableFrom !== null">[%Reservieren|Reserve%]</button>
  </article>
  <article class="card" :class="{ 'on-loan': tent.availableFrom !== null }" :style="{ borderWidth: tent.deposit >= 50 ? '3px' : '1px' }">
    <a :href="'#/items/' + tent.id">{{ tent.name }}</a>
    <button type="button" :disabled="tent.availableFrom !== null">[%Reservieren|Reserve%]</button>
  </article>
</template>

<style>
.card {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
}
.on-loan {
  background: #f6e7e4;
}
</style>
