<script setup>
const items = [
  { id: 1, name: 'Drill', category: 'Tools', availableFrom: null },
  { id: 2, name: 'Tent for four', category: 'Camping', availableFrom: '2026-11-12' },
  { id: 3, name: 'Raclette oven', category: 'Kitchen', availableFrom: null },
  { id: 4, name: 'Beer bench set', category: 'Parties', availableFrom: '2026-11-03' },
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
