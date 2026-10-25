<script setup>
import ItemList from './components/ItemList.vue'
import { items } from './items.js'
</script>

<template>
  <h1>Lorraine Commons</h1>
  <ItemList :items="items" />
</template>