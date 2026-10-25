<script setup>
import { RouterLink } from 'vue-router'

import items from '../../data/items.json'
</script>

<template>
  <h1 tabindex="-1">[%Katalog|Catalog%]</h1>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id">
      <RouterLink :to="{ name: 'item', params: { id: item.id } }" class="name">{{ item.name }}</RouterLink>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>
