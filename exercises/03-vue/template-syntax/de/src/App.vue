<script setup>
import items from '../data/items.json'

import { formatDate, formatDeposit } from './format.js'
</script>

<template>
  <h1>Katalog</h1>
  <p>{{ items.length }} Dinge</p>
</template>
