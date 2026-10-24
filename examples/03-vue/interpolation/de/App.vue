<script setup>
const item = { name: 'Raclette-Ofen', category: 'Küche', deposit: 30, availableFrom: null }
const note = '<b>Nur für Mitglieder</b>'
</script>

<template>
  <h1>{{ item.name }}</h1>
  <!-- Every JavaScript expression works, a statement such as if does not -->
  <p>{{ item.category.toUpperCase() }}, Pfand CHF {{ item.deposit.toFixed(2) }}</p>
  <p>{{ item.availableFrom === null ? 'Verfügbar' : 'Ausgeliehen' }}</p>
  <!-- Interpolation inserts text, so the tags appear as characters -->
  <p>{{ note }}</p>
</template>
