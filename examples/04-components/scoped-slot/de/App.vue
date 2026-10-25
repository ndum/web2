<script setup>
import ItemList from './ItemList.vue'

const items = [
  { id: 1, name: 'Bohrmaschine', deposit: 20, availableFrom: null },
  { id: 2, name: 'Zelt für vier Personen', deposit: 50, availableFrom: '2026-11-12' },
  { id: 6, name: 'Beamer', deposit: 80, availableFrom: null },
]
</script>

<template>
  <h2>Mit eigenem Inhalt</h2>
  <ItemList :items="items">
    <template #item="{ item }">
      <strong>{{ item.name }}</strong>, Pfand CHF {{ item.deposit }}
    </template>
  </ItemList>

  <h2>Mit dem Inhalt der Liste</h2>
  <ItemList :items="items" />
</template>
