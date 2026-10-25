<script setup>
import { RouterLink } from 'vue-router'

import items from '../../data/items.json'
</script>

<template>
  <h1>Katalog</h1>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id">
      <RouterLink :to="{ name: 'item', params: { id: item.id } }">{{ item.name }}</RouterLink>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>
