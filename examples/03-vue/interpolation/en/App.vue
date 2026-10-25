<script setup>
const item = { name: 'Raclette oven', category: 'Kitchen', deposit: 30, availableFrom: null }
const note = '<b>Members only</b>'
</script>

<template>
  <h1>{{ item.name }}</h1>
  <!-- Every JavaScript expression works, a statement such as if does not -->
  <p>{{ item.category.toUpperCase() }}, deposit CHF {{ item.deposit.toFixed(2) }}</p>
  <p>{{ item.availableFrom === null ? 'Available' : 'On loan' }}</p>
  <!-- Interpolation inserts text, so the tags appear as characters -->
  <p>{{ note }}</p>
</template>
