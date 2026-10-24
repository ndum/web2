<script setup>
const items = [
  { id: 1, name: '[%Bohrmaschine|Drill%]', category: '[%Werkzeug|Tools%]', availableFrom: null },
  { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', category: '[%Camping|Camping%]', availableFrom: '2026-11-12' },
  { id: 3, name: '[%Raclette-Ofen|Raclette oven%]', category: '[%Küche|Kitchen%]', availableFrom: null },
  { id: 4, name: '[%Festbankgarnitur|Beer bench set%]', category: '[%Feste|Parties%]', availableFrom: '2026-11-03' },
]
</script>

<template>
  <ul>
    <!-- The key tells Vue which entry belongs to which thing -->
    <li v-for="(item, index) in items" :key="item.id" :class="{ 'on-loan': item.availableFrom !== null }">
      {{ index + 1 }}. {{ item.name }}, {{ item.category }}
    </li>
  </ul>
</template>

<style>
.on-loan {
  color: #a3341f;
}
</style>
