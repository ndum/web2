<script setup>
import { RouterLink } from 'vue-router'

import { things } from './things.js'
</script>

<template>
  <h1>Katalog</h1>
  <ul>
    <li v-for="thing in things" :key="thing.id">
      <RouterLink :to="{ name: 'item', params: { id: thing.id } }">{{ thing.name }}</RouterLink>
    </li>
  </ul>
</template>
