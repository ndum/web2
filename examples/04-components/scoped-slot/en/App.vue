<script setup>
import ItemList from './ItemList.vue'

const items = [
  { id: 1, name: 'Drill', deposit: 20, availableFrom: null },
  { id: 2, name: 'Tent for four', deposit: 50, availableFrom: '2026-11-12' },
  { id: 6, name: 'Projector', deposit: 80, availableFrom: null },
]
</script>

<template>
  <h2>With content of its own</h2>
  <ItemList :items="items">
    <template #item="{ item }">
      <strong>{{ item.name }}</strong>, deposit CHF {{ item.deposit }}
    </template>
  </ItemList>

  <h2>With the content of the list</h2>
  <ItemList :items="items" />
</template>
