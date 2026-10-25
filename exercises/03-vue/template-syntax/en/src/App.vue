<script setup>
import items from '../data/items.json'

import { formatDate, formatDeposit } from './format.js'
</script>

<template>
  <h1>Catalog</h1>
  <p>{{ items.length }} things</p>
</template>
